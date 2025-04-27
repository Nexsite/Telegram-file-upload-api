
const BOT_TOKEN = "BOT-API"; // Replace with your bot's API token
const CHAT_ID = "GROUP-CHAT"; // Replace with your group chat ID

async function sendFile() {
  const fileInput = document.getElementById("fileInput");
  const captionInput = document.getElementById("captionInput");
  const status = document.getElementById("status");

  const file = fileInput.files[0];
  const caption = captionInput.value.trim();

  if (!file && caption === "") {
    status.textContent = "❌ Please select a file or enter a message.";
    return;
  }

  try {
    status.textContent = "📤 Sending...";

    if (file) {
      // Send document (with optional caption)
      const formData = new FormData();
      formData.append("chat_id", CHAT_ID);
      formData.append("document", file);
      if (caption !== "") {
        formData.append("caption", caption);
      }

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (result.ok) {
        status.textContent = "✅ File sent successfully!";
        fileInput.value = ""; // Clear file input
        captionInput.value = ""; // Optional: also clear text input
      } else {
        status.textContent = "❌ Error: " + result.description;
      }
    } else {
      // Send text only
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: caption,
          }),
        }
      );
      const result = await response.json();
      if (result.ok) {
        status.textContent = "✅ Message sent successfully!";
        captionInput.value = "";
      } else {
        status.textContent = "❌ Error: " + result.description;
      }
    }
  } catch (err) {
    status.textContent = "❌ Failed to send: " + err.message;
  }
}

function clearFile() {
  document.getElementById("fileInput").value = "";
}

