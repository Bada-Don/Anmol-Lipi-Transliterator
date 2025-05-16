# 🌐 **Anmol Transliterator**

Anmol Transliterator is a simple yet powerful tool that converts Roman text into custom-language fonts like **Anmol Lipi**, **Gurbani**, **Prabhki**, and **GurbaniHindi** using an intelligent backend logic. It is designed to assist designers, typists, and everyday users in efficiently typing in Hindi, Punjabi, and other regional languages without the need to memorize complex key mappings.

---

## 🚀 Motivation

During the **Google Solution Challenge Workshop** held at **CGC Landran**, one of the speakers encouraged us to start solving real-world problems around us—those affecting our friends, family, and ourselves—before trying to tackle global-scale issues.

That’s when I remembered something my father once mentioned:

> “Typing long Hindi or Punjabi content is time-consuming and frustrating, especially when you're short on time.”

This small yet significant problem sparked the idea of building a tool that makes typing in regional fonts faster and easier.

---

## ❗ Problem Statement

You’ve probably seen **banners, signboards, and pamphlets** written in regional languages like **Punjabi, Hindi, or Urdu**. But have you ever wondered **how** they are typed?

Designers don’t usually use native language keyboards. Instead, they rely on **special fonts** (e.g., *Anmol Lipi*, *Gurbani*, *Prabhki*) that map Roman keyboard keystrokes to characters of regional scripts.
This requires memorizing unintuitive key mappings, which can be tedious and time-consuming—even for experienced users.

---

## 💡 The Solution

To solve this, I built **Anmol Transliterator**, which automates and simplifies the transliteration process:

1. 🔡 Created a detailed **character map** for the chosen fonts.
2. 📡 Set up an **API call** to a Large Language Model (LLM) to handle transliteration based on the input language.
3. 📥 The LLM returns a **Python list** representing the transliterated characters.
4. ⚙️ This list is passed to a **mapping engine** that converts it into a string based on the logic of the target font.
5. 📤 The final **output string** is returned, ready for use in design software or content creation tools.

---

## 📘 How to Use

1. 🔤 **Enter** the text you want to transliterate (e.g., "sat sri akaal").
2. 📤 Click the **Send** button.
3. ⏳ Wait a moment while the response is processed.
4. 📋 Once the output appears, (eg. sq sRI Akwl) click the **Copy** button to use it anywhere!

---

## 🧠 Tech Stack

* **Frontend**: ReactJs, Tailwind CSS
* **Backend**: Python, Flask
* **AI/LLM Integration**: Gemini 2.0 Flash
* **Font Mapping**: Custom logic to match fonts like Anmol Lipi

---

## 🙌 Future Improvements

* 🔁 Add support for more fonts and languages.
* 🔤 Enable reverse transliteration (Font → Roman).
* 🧠 Improve AI accuracy using feedback loops.
* 🫙 Storing correct results of repeated words for optimization.

---

## 📣 Acknowledgements

Special thanks to **my father** for inspiring this project. Also, gratitude to everyone who faces typing frustration daily—you inspired this solution.

---

## ✅ Status

> ✅ **Working Prototype Available**
> 🚧 Currently under producition and testing for accuracy.
