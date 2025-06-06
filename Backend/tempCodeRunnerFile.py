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