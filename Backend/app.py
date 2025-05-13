from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import ast
import re
import json
import os
from dotenv import load_dotenv

from anmol_transliterate import transliterate_punjabi

load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # Option 1: Raise an error if key is missing
    raise ValueError("Missing GEMINI_API_KEY environment variable. Please set it.")

MODEL_NAME = "gemini-2.0-flash" 
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GEMINI_API_KEY}"

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing your React app to call this API

def call_gemini_for_punjabi_list(english_input):
    """
    Calls the Gemini model to get the Punjabi character list.
    This function is adapted from your ai_studio_part1.py.
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

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload, timeout=30) 
        response.raise_for_status() 
        result = response.json()

        if not result.get('candidates') or not result['candidates'][0].get('content') or not result['candidates'][0]['content'].get('parts'):
            print("Error: Unexpected Gemini API response structure:", result)
            return None

        model_text = result['candidates'][0]['content']['parts'][0]['text']
        
        model_text_cleaned = re.sub(r"^```json\n|```$", "", model_text.strip(), flags=re.MULTILINE)
        model_text_cleaned = re.sub(r"^```\n|```$", "", model_text_cleaned.strip(), flags=re.MULTILINE)

        list_start = model_text_cleaned.find('[')
        if list_start == -1:
            print(f"Error: Could not find list in Gemini response: {model_text_cleaned}")
            return None
        
        list_str = model_text_cleaned[list_start:]
        
        punjabi_list_raw = None # Use a temporary variable
        try:
            punjabi_list_raw = json.loads(list_str)
        except json.JSONDecodeError:
            try:
                punjabi_list_raw = ast.literal_eval(list_str)
            except (ValueError, SyntaxError) as e:
                print(f"Error evaluating list string: {list_str}, Error: {e}")
                return None
        
        # ---- START: ADDED CHECK FOR EXTRA NESTING ----
        punjabi_list = punjabi_list_raw
        if isinstance(punjabi_list_raw, list) and len(punjabi_list_raw) == 1 and isinstance(punjabi_list_raw[0], list):
             # Check if it looks like the [[list1, list2]] structure
             potential_inner_list = punjabi_list_raw[0]
             if all(isinstance(item, list) for item in potential_inner_list):
                 print("Detected extra nesting, correcting structure.")
                 punjabi_list = potential_inner_list # Use the inner list
        # ---- END: ADDED CHECK FOR EXTRA NESTING ----

        # Now perform the validation on the potentially corrected list
        if not isinstance(punjabi_list, list) or \
           not all(isinstance(word_list, list) for word_list in punjabi_list) or \
           not all(isinstance(char, str) for word_list in punjabi_list for char in word_list):
            # Log the *original* raw data for better debugging if validation fails
            print(f"Error: Gemini output is not in the expected list of lists of strings format: {punjabi_list_raw}") 
            return None
            
        return punjabi_list

    except requests.exceptions.RequestException as e:
        print(f"Error calling Gemini API: {e}")
        print(f"Response status: {response.status_code if 'response' in locals() else 'N/A'}")
        print(f"Response text: {response.text if 'response' in locals() else 'N/A'}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred in call_gemini_for_punjabi_list: {e}")
        return None


@app.route('/api/transliterate', methods=['POST'])
def transliterate_endpoint():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' in request body"}), 400

    english_input = data['text']
    if not english_input.strip():
        return jsonify({"transliterated_text": ""}) # Return empty if input is empty

    # Step 1: Get Punjabi list from Gemini
    punjabi_output_list = call_gemini_for_punjabi_list(english_input)

    if punjabi_output_list is None:
        # Try to provide a fallback or a more specific error
        # For now, a generic error. You might want to use a simpler, rule-based transliterator as a fallback.
        # For example, use the user's original English input as a placeholder.
        # Or, if ai_studio_part1.py itself has a simpler transliteration, you could use that.
        # For now, we'll indicate failure to Aura.
        return jsonify({"error": "Aura couldn't process the script for this input."}), 500

    # Step 2: Transliterate using anmol_transliterate
    try:
        transliterated_words = []
        for word_list in punjabi_output_list: # word_list is a list of characters
            transliterated_words.append(''.join(transliterate_punjabi(word_list)))
        
        final_output = ' '.join(transliterated_words)
        return jsonify({"transliterated_text": final_output})
    except Exception as e:
        print(f"Error during Anmol transliteration: {e}")
        return jsonify({"error": "Error processing script after translation."}), 500

if __name__ == '__main__':
    # Make sure to use your actual Gemini API Key in GEMINI_API_KEY above
    # You might need to replace it if it's a placeholder.
    if "AIzaSyB" in GEMINI_API_KEY and "YOUR_API_KEY" in GEMINI_API_KEY.upper(): # Basic check for placeholder
        print("WARNING: It looks like GEMINI_API_KEY is a placeholder. Please replace it with your actual API key.")
    app.run(debug=True, port=5000) # Runs on http://localhost:5000