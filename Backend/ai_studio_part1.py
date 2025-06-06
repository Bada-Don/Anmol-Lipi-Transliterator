import requests
import ast
import re
from anmol_transliterate import transliterate_punjabi

import os

from dotenv import load_dotenv
load_dotenv()

# 🔐 Replace with your Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("Loaded URI:", GEMINI_API_KEY)  # 🔍 Only for local debugging!

MODEL_NAME = "gemini-2.0-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GEMINI_API_KEY}"

def call_gemini_model(english_input):
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

    response = requests.post(GEMINI_API_URL, headers=headers, json=payload)

    try:
        result = response.json()
        model_text = result['candidates'][0]['content']['parts'][0]['text']

        # Remove code block markers like ```json and ```
        model_text_cleaned = re.sub(r"^```json\n|```$", "", model_text.strip(), flags=re.MULTILINE)

        # Extract list and evaluate
        list_start = model_text_cleaned.find('[')
        list_str = model_text_cleaned[list_start:]
        punjabi_list = ast.literal_eval(list_str)

        return punjabi_list

    except Exception:
        return None

# ---------- Run Pipeline ---------- #
if __name__ == "__main__":
    english_input = input("Enter English sentence: ")
    punjabi_output_list = call_gemini_model(english_input)

    if punjabi_output_list:
        transliterated_words = []
        for word in punjabi_output_list:
            transliterated_words.append(''.join(transliterate_punjabi(word)))

        final_output = ' '.join(transliterated_words)
        print(final_output)
    else:
        print("Could not transliterate the input.")
