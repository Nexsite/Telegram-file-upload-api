const BOT_TOKEN = 'BOT-API';  // Replace with your bot's API token
const CHAT_ID = 'GROUP-CHAT';  // Replace with your group chat ID

async function sendFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const status = document.getElementById('status');

  if (!file) {
    status.textContent = 'Please select a file first.';
    return;
  }

  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('document', file);

  try {
    status.textContent = 'Sending file...';

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
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
