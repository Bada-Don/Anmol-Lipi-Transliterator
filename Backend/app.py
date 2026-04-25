from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import errors
import ast
import re
import json
import os
import logging
import traceback
from dotenv import load_dotenv

from anmol_transliterate import transliterate_punjabi

load_dotenv()

# --- Logging Setup ---
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('aura')


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # Option 1: Raise an error if key is missing
    raise ValueError("Missing GEMINI_API_KEY environment variable. Please set it.")

MODEL_NAME = "gemini-2.5-flash" 
client = genai.Client(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing your React app to call this API

def call_gemini_for_punjabi_list(english_input):
    """
    Calls the Gemini model to get the Punjabi character list.
    Returns (data, None) on success or (None, error_dict) on failure.
    error_dict has: code, message, details (for server logs).
    """
    headers = {
        "Content-Type": "application/json"
    }

    prompt = f"""Translate the given English word/sentence to Punjabi.
Make a list of the Punjabi word/sentence like:

Example 1:
Input: "Harshit"
Expected Output:
[["ਹ", "ਰ", "ਿ", "ਸ਼", "ਤ"]]

Example 2:
Input: "Sat Sri Akal"
Expected Output:
[
    ["ਸ", "ਤ"],
    ["ਸ਼", "੍", "ੀ"],
    ["ਅ", "ਕ", "ਾ", "ਲ"]
]

Example 3:
Input: "prabhat"
Expected Output:
[
    ["ਪ", "੍", "ਭ", "ਾ", "ਤ"]
]

Now do the same for: "{english_input}"
Only output the final list in JSON format without any explanation.
"""

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    # --- Step 1: Call Gemini API ---
    try:
        logger.info(f"Calling Gemini API for input: '{english_input[:80]}...'")
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )
    except errors.APIError as e:
        logger.error(f"Gemini API Error: {e.message}")
        status = e.code
        err_msg = e.message
        
        if status == 400:
            return None, {
                "code": "GEMINI_BAD_REQUEST",
                "message": "The AI rejected the request (400). Input may contain unsupported content.",
                "details": err_msg
            }
        elif status == 401 or status == 403:
            return None, {
                "code": "GEMINI_AUTH_ERROR",
                "message": f"AI service authentication failed ({status}). API key may be invalid or expired.",
                "details": err_msg
            }
        elif status == 429:
            return None, {
                "code": "GEMINI_RATE_LIMITED",
                "message": "AI service is rate-limited. Please wait a moment and try again.",
                "details": err_msg
            }
        elif status >= 500:
            return None, {
                "code": "GEMINI_SERVER_ERROR",
                "message": f"The AI service is experiencing issues (HTTP {status}). Try again later.",
                "details": err_msg
            }
        else:
            return None, {
                "code": "GEMINI_HTTP_ERROR",
                "message": f"AI service returned an unexpected error (HTTP {status}).",
                "details": err_msg
            }
    except Exception as e:
        logger.error(f"Gemini API request failed: {e}")
        return None, {
            "code": "GEMINI_REQUEST_ERROR",
            "message": f"AI service request failed: {type(e).__name__}",
            "details": str(e)
        }

    # --- Step 2 & 3 & 4: Extract model text from response structure ---
    try:
        model_text = response.text
        if not model_text:
            return None, {
                "code": "GEMINI_EMPTY_RESPONSE",
                "message": "The AI returned an empty response. Please try again with different input.",
                "details": "response.text is empty"
            }
        logger.debug(f"Gemini raw output: {model_text[:300]}")
    except Exception as e:
        logger.error(f"Error accessing response text: {e}")
        return None, {
            "code": "GEMINI_MALFORMED_RESPONSE",
            "message": "The AI returned a response in an unexpected format. Please try again.",
            "details": str(e)
        }


    # --- Step 5: Clean and extract the list from model text ---
    model_text_cleaned = re.sub(r"^```json\n|```$", "", model_text.strip(), flags=re.MULTILINE)
    model_text_cleaned = re.sub(r"^```\n|```$", "", model_text_cleaned.strip(), flags=re.MULTILINE)

    list_start = model_text_cleaned.find('[')
    if list_start == -1:
        logger.error(f"No list found in Gemini output: {model_text_cleaned[:300]}")
        return None, {
            "code": "GEMINI_NO_LIST_IN_OUTPUT",
            "message": "The AI did not return a transliterable list. It may not have understood the input.",
            "details": f"No '[' found in cleaned output: {model_text_cleaned[:300]}"
        }

    list_str = model_text_cleaned[list_start:]

    # --- Step 6: Parse the list string ---
    punjabi_list_raw = None
    try:
        punjabi_list_raw = json.loads(list_str)
    except json.JSONDecodeError:
        try:
            punjabi_list_raw = ast.literal_eval(list_str)
        except (ValueError, SyntaxError) as e:
            logger.error(f"Failed to parse list from Gemini output.\nList string: {list_str[:300]}\nError: {e}")
            return None, {
                "code": "GEMINI_LIST_PARSE_ERROR",
                "message": "The AI returned a malformed list that couldn't be parsed. Please try again.",
                "details": f"Parse error: {e}. Raw list_str: {list_str[:300]}"
            }

    # --- Step 7: Fix extra nesting ---
    punjabi_list = punjabi_list_raw
    if isinstance(punjabi_list_raw, list) and len(punjabi_list_raw) == 1 and isinstance(punjabi_list_raw[0], list):
         potential_inner_list = punjabi_list_raw[0]
         if all(isinstance(item, list) for item in potential_inner_list):
             logger.debug("Detected extra nesting, correcting structure.")
             punjabi_list = potential_inner_list

    # --- Step 8: Validate structure ---
    if not isinstance(punjabi_list, list) or \
       not all(isinstance(word_list, list) for word_list in punjabi_list) or \
       not all(isinstance(char, str) for word_list in punjabi_list for char in word_list):
        logger.error(f"Gemini output failed validation. Expected list[list[str]], got: {type(punjabi_list).__name__}. Raw: {punjabi_list_raw}")
        return None, {
            "code": "GEMINI_INVALID_FORMAT",
            "message": "The AI returned data in an unexpected format (not a list of character lists).",
            "details": f"Validation failed. Type: {type(punjabi_list).__name__}, Raw: {str(punjabi_list_raw)[:300]}"
        }

    logger.info(f"Successfully parsed Punjabi list with {len(punjabi_list)} word(s).")
    return punjabi_list, None

@app.route('/', methods=['GET'])
def Test():
    return 'Hello World'

@app.route('/api/transliterate', methods=['POST'])
def transliterate_endpoint():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' in request body", "code": "MISSING_INPUT"}), 400

    english_input = data['text']
    if not english_input.strip():
        return jsonify({"transliterated_text": ""}) # Return empty if input is empty

    logger.info(f"Transliterate request received: '{english_input[:100]}'")

    # Step 1: Get Punjabi list from Gemini
    punjabi_output_list, error = call_gemini_for_punjabi_list(english_input)

    if error:
        logger.error(f"[{error['code']}] {error['message']} | Details: {error.get('details', 'N/A')}")
        status_code = 502 if error['code'].startswith('GEMINI_') else 500
        if error['code'] == 'GEMINI_RATE_LIMITED':
            status_code = 429
        elif error['code'] in ('GEMINI_AUTH_ERROR',):
            status_code = 503
        return jsonify({
            "error": error['message'],
            "code": error['code']
        }), status_code

    # Step 2: Transliterate using anmol_transliterate
    try:
        transliterated_words = []
        for word_list in punjabi_output_list:
            transliterated_words.append(''.join(transliterate_punjabi(word_list)))
        
        final_output = ' '.join(transliterated_words)
        logger.info(f"Transliteration successful: '{final_output[:100]}'")
        return jsonify({"transliterated_text": final_output})
    except Exception as e:
        logger.error(f"Error during Anmol transliteration: {e}\n{traceback.format_exc()}")
        return jsonify({
            "error": f"Error during script mapping: {type(e).__name__} — {str(e)}",
            "code": "TRANSLITERATION_ERROR"
        }), 500

if __name__ == '__main__':
    # Make sure to use your actual Gemini API Key in GEMINI_API_KEY above
    # You might need to replace it if it's a placeholder.
    if "AIzaSyB" in GEMINI_API_KEY and "YOUR_API_KEY" in GEMINI_API_KEY.upper(): # Basic check for placeholder
        print("WARNING: It looks like GEMINI_API_KEY is a placeholder. Please replace it with your actual API key.")
    app.run(debug=True, port=5000) # Runs on http://localhost:5000