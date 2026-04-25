import logging
logger = logging.getLogger('aura.transliterate')

def transliterate_punjabi(input_list):

    transliteration = []

    char_map = {
        # Vowels (Independent)
        'ਅ': 'A', 'ਆ': 'Aw', 'ਇ': 'ie', 'ਈ': 'eI', 'ਉ': 'au', 'ਊ': 'aU',
        'ਏ': 'ey', 'ਐ': 'AY', 'ਓ': 'E', 'ਔ': 'AO', 
        
        # Vowels (Dependent/Matras)
        'ਾ': 'w', 'ਿ': 'i', 'ੀ': 'I', 'ੁ': 'u', 'ੂ': 'U', 'ੇ': 'y', 'ੈ': 'Y', 'ੋ': 'o', 'ੌ': 'O',
        
        # Consonants
        'ੳ': 'a', 'ਅ': 'A', 'ੲ': 'e',
        'ਸ': 's', 'ਹ': 'h',
        'ਕ': 'k', 'ਖ': 'K', 'ਗ': 'g', 'ਘ': 'G', 'ਙ': '|',
        'ਚ': 'c', 'ਛ': 'C', 'ਜ': 'j', 'ਝ': 'J', 'ਞ': 'I',
        'ਟ': 't', 'ਠ': 'T', 'ਡ': 'f', 'ਢ': 'F', 'ਣ': 'x',
        'ਤ': 'q', 'ਥ': 'Q', 'ਦ': 'd', 'ਧ': 'D', 'ਨ': 'n',
        'ਪ': 'p', 'ਫ': 'P', 'ਬ': 'b', 'ਭ': 'B', 'ਮ': 'm',
        'ਯ': 'X', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'V',
        
        # Modified Consonants (with dot)
        'ਸ਼': 'S', 'ਖ਼': 'K', 'ਗ਼': 'G', 'ਜ਼': 'z', 'ਫ਼': 'P', 'ਲ਼': 'L',
        'ਲ': 'l', # redundancy check
        
        # Nasals/Special
        'ਂ': 'N', 'ੰ': 'M', 'ੱ': '`', 'ਁ': 'N',
        
        # Subscripts
        '੍ਹ': 'H', '੍ਰ': 'R', '੍ਵ': 'V', '੍ਯ': 'X', '੍': ' ',
        
        # Combined/Common errors from Gemini
        'ੈਂ': 'YM', 'ੋਂ': 'oN', 'ਾਂ': 'wN', 'ੀਂ': 'IN', 'ੂਂ': 'UN', 'ੋਂ': 'oN',
        
        # Punctuation & Space
        ' ': ' ', '।': '.', ',': ',', '.': '.', '-': '-', '?': '?'
    }

    i = 0
    while i < len(input_list):
        char = input_list[i]

        # Rule 2: 'ਿ' after '੍ਰ' or '੍ਹ' → place 'i' before i-2th char
        if char == 'ਿ' and i >= 2 and input_list[i - 1] in ['੍ਰ', '੍ਹ']:
            prev2 = input_list[i - 2]
            prev1 = input_list[i - 1]
            
            translit_prev2 = char_map.get(prev2, prev2)
            translit_prev1 = char_map.get(prev1, prev1)
            translit_i = char_map.get(char, char)
            
            # Remove last two and reorder
            if len(transliteration) >= 2:
                transliteration = transliteration[:-2]
            transliteration.extend([translit_i, translit_prev2, translit_prev1])
            i += 1

        # Rule 1: Simple 'ਿ' case → place 'i' before i-1th char
        elif char == 'ਿ' and i > 0:
            prev = input_list[i - 1]
            translit_prev = char_map.get(prev, prev)
            translit_i = char_map.get(char, char)
            
            if len(transliteration) >= 1:
                transliteration = transliteration[:-1]
            transliteration.extend([translit_i, translit_prev])
            i += 1

        # Normal mapping with self-healing fallback
        else:
            mapped = char_map.get(char, char)
            
            # Self-healing: if mapped character is still Gurmukhi, try to break it down
            if any(ord(c) > 127 for c in mapped):
                # Attempt to map individual characters within the string if Gemini returned a cluster
                healed = ""
                for subchar in mapped:
                    healed += char_map.get(subchar, subchar)
                logger.info(f"Self-healing: Repaired '{mapped}' -> '{healed}'")
                transliteration.append(healed)
            else:

                transliteration.append(mapped)
            i += 1


    return transliteration


# Example usage
example = [
  [
    "ਐ",
    "ਮ",
    ".",
    "ਐ",
    "ਲ",
    ".",
    "ਏ"
  ]
]

result = []
for l in example:
    result.append(''.join(transliterate_punjabi(l)))

Res = ' '.join(result)

if __name__ == '__main__':
    print(Res) 


# ------------------------------------# My Prompt #----------------------------------------------- #
# My Prompt
# Follow the following steps:
# 1. Translate the given English word/sentence to Punjabi 
# 2. Make a list of the Punjabi word/sentence like:

# Example 1:
# Input: "Harshit"
# Expected Output:
# [["ਹ", "ਰ", "ਿ", "ਸ਼", "ਤ"]]

# Example 2:
# Input: "Sat Sri Akal"
# Expected Output:
# [
#     ["ਸ", "ਤ"],
#     ["ਸ਼", "੍", "ੀ"],
#     ["ਅ", "ਕ", "ਾ", "ਲ"]
# ]

# Example 3 (testing subscript and matra):
# Input: "prabhat"
# Expected Output:
# [
#     ["ਪ", "੍", "ਭ", "ਾ", "ਤ"]
# ]
