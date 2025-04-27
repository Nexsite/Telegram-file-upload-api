# Telegram File Uploader Web App Documentation

This is a step-by-step guide to creating a **Telegram File Uploader** web app that allows users to upload files to a **Telegram group** or **direct message** using the **Telegram Bot API**. This app is built using **HTML** and **JavaScript**.

---

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Create a Telegram Bot](#create-a-telegram-bot)
  - [Get Your Chat ID](#get-your-chat-id)
- [Building the App](#building-the-app)
  - [Step 1: HTML Structure](#step-1-html-structure)
  - [Step 2: JavaScript Logic](#step-2-javascript-logic)
- [Running the App Locally](#running-the-app-locally)
- [Deploying the App](#deploying-the-app)
- [Security Considerations](#security-considerations)
- [Conclusion](#conclusion)

---

## Introduction

In this tutorial, we will build a **Telegram File Uploader** web app. The app allows you to send files to a **Telegram group** or a **direct message** by simply providing the **Telegram bot token**, **chat ID**, and selecting a file to upload. The app is built using **HTML** and **JavaScript**, and it communicates with the **Telegram Bot API**.

---

## Technologies Used

- **HTML**: For the structure and layout of the web page.
- **JavaScript**: For handling the logic and sending requests to the Telegram API.
- **Telegram Bot API**: To send files via a Telegram bot.

---

## Getting Started

Before we start building the app, you need to gather two essential pieces of information from Telegram:

### Create a Telegram Bot

1. **Start a conversation with [@BotFather](https://t.me/BotFather) on Telegram**.
2. Type `/newbot` to create a new bot.
3. Follow the instructions and **save the bot token** you receive. You will use this token to make requests to the Telegram Bot API.

### Get Your Chat ID

The **chat ID** is used to specify where the file will be sent. You can get the chat ID by:

- **For User ID**: Use the [@userinfobot](https://t.me/userinfobot) on Telegram to get your **user ID**.
- **For Group Chat ID**:
  1. Add your bot to a group.
  2. Send a message to the group.
  3. Open this URL:
     ```
     https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
     ```
     Replace `<YOUR_BOT_TOKEN>` with your actual bot token.
  4. In the response, find `chat.id`. If it's a group, the ID will start with `-100`.

---

## Building the App

Now, let's begin building the app!

### Step 1: HTML Structure

First, we create the basic structure of the app using HTML. The `index.html` file will contain the form where users can input their bot token, chat ID, and select a file to upload.

Create the `index.html` file with the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upload File to Telegram</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
    h1 { text-align: center; }
    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    input[type="file"], input[type="text"] { width: 100%; padding: 10px; margin: 10px 0; border-radius: 5px; border: 1px solid #ccc; }
    button { width: 100%; padding: 10px; background-color: #28a745; border: none; color: white; font-size: 16px; cursor: pointer; border-radius: 5px; }
    button:hover { background-color: #218838; }
    .status { margin-top: 10px; text-align: center; }
  </style>
</head>
<body>

  <div class="container">
    <h1>Upload File to Telegram</h1>
    <p>Enter your **Telegram Bot Token** and **User ID** below:</p>

    <!-- Input Fields for Bot Token and User ID -->
    <input type="text" id="botToken" placeholder="Enter your bot token" />
    <input type="text" id="chatId" placeholder="Enter your chat ID (e.g. user ID or group ID)" />
    
    <!-- File Upload -->
    <input type="file" id="fileInput" />

    <!-- Submit Button -->
    <button onclick="sendFile()">Send to Telegram</button>

    <!-- Status message -->
    <p id="status" class="status"></p>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

In this file:

We create a simple form with fields for the bot token, chat ID, and a file input to choose a file.

We also have a submit button to trigger the upload.

Step 2: JavaScript Logic
Next, we'll write the JavaScript logic to handle the file upload. Create a file called app.js and add the following content:

```javascript
Copy
Edit
async function sendFile() {
  const botToken = document.getElementById('botToken').value;
  const chatId = document.getElementById('chatId').value;
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');

  // Check if inputs are filled
  if (!botToken || !chatId || !fileInput.files.length) {
    status.textContent = '❌ Please fill in all fields and select a file.';
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('chat_id', chatId);  // Bot will send to this chat ID
  formData.append('document', file);   // Attach the file to the request

  // Send the file to Telegram via the Bot API
  try {
    status.textContent = 'Sending file...';
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.ok) {
      status.textContent = '✅ File sent successfully!';
    } else {
      status.textContent = '❌ Error: ' + result.description;
    }
  } catch (err) {
    status.textContent = '❌ Failed to send file: ' + err.message;
  }
}
```
In this code:

- We retrieve the bot token, chat ID, and file from the input fields.

- We then create a FormData object to hold the file and send it to the Telegram Bot API.

- We display a status message indicating whether the file was sent successfully or if there was an error.

## Running the App Locally
To run the app locally:

1. Save the index.html and app.js files in the same directory.

2. Open the index.html file in your web browser.

3. Enter your bot token and chat ID, select a file to upload, and click Send to Telegram.

4. The app will display the status of the file upload.

## Deploying the App
You can deploy the app to any static hosting provider, such as:

- GitHub Pages

- Netlify

- Vercel

Simply upload your files, and you’ll have a live version of the app!

## Security Considerations
- *Bot Token Exposure*: In this simple implementation, the bot token is exposed in the frontend (JavaScript), which is not secure. For production use, consider implementing a backend to handle API requests securely.

- PI Rate Limits: Be mindful of the Telegram Bot API rate limits. Sending too many requests in a short period could result in temporary blocks for your bot.

Feel free to customize and expand this app further, adding features like multiple file uploads, error handling, or a backend for secure API calls.

### Contributing
Feel free to open issues or submit pull requests if you'd like to improve or add features to this project!