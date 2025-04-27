
async function sendFile() {
  // Selectors
  const botToken = document.getElementById('botToken').value;
  const chatId = document.getElementById('chatId').value;
  const fileInput = document.getElementById('fileInput');
  const caption = document.getElementById('captionInput').value.trim();
  const status = document.getElementById('status');
  const statusCard = document.getElementById('statusCard');

  // Validate essential fields
  if (!botToken || !chatId || (!fileInput.files.length && caption === '')) {
    status.textContent = '❌ Please provide at least a file or a text message.';
    return;
  }

  // If file is selected, send it (with caption if available)
  if (fileInput.files.length) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', file);
    if (caption !== '') {
      formData.append('caption', caption);
    }

    try {
      status.textContent = '📤 Sending file...';
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.ok) {
        status.textContent = '✅ File sent successfully!';
        // Clear file input after success
        fileInput.value = '';
      } else {
        status.textContent = '❌ Error: ' + result.description;
      }
    } catch (err) {
      status.textContent = '❌ Failed to send file: ' + err.message;
    }
  } else {
    // If no file, send just the caption as a text message
    try {
      status.textContent = '📤 Sending message...';
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: caption
        })
      });
      const result = await response.json();
      if (result.ok) {
        status.textContent = '✅ Message sent successfully!';
        // Clear file input after message
        fileInput.value = '';
      } else {
        status.textContent = '❌ Error: ' + result.description;
      }
    } catch (err) {
      status.textContent = '❌ Failed to send message: ' + err.message;
    }
  }

}

function clearFile() {
  const fileInput = document.getElementById('fileInput');
  fileInput.value = ''; // This clears the selected file
}