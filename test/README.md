# 📡 Telegram Bot API Tester

A simple browser-based tool to test sending files and messages using your own Telegram Bot.

---

## ✨ Features

- ✅ Send files using `sendDocument`
- ✅ Send text messages using `sendMessage`
- ✅ Send both a file and a caption
- ✅ Manual "Clear File" button
- ✅ No backend required — runs in any browser

---

## 📁 Files Included

- `test/index.html` – Main file, open it in any browser to start testing.

---

## 🔧 How to Use

1. Open `test/index.html` in your browser.
2. Fill in the following:
   - **Bot Token** (from [@BotFather](https://t.me/BotFather))
   - **Chat ID** (your user ID or a group ID)
3. Optionally select a file to upload.
4. Optionally enter a message.
5. Click **"Send to Telegram"**.

---

## 🧪 Test Scenarios

| Input Type       | Result                              |
|------------------|-------------------------------------|
| File only        | Sends file to chat                  |
| Text only        | Sends message only                  |
| File + text      | Sends file with caption             |
| No input         | ❌ Shows error message               |

---
