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
  