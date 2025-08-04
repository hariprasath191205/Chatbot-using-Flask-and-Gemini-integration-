  async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage("You", message, "user-message");
  inputField.value = "";

  try {
    const res = await fetch("http://127.0.0.1:5050/chat",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await res.json();

    if (data.response) {
      appendMessage("Nova", data.response, "bot-message");
    } else {
      appendMessage("Nova", "Sorry, something went wrong.", "bot-message");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    appendMessage("Nova", "Error contacting the server.", "bot-message");
  }
}


function appendMessage(sender, text, className) {
  const chatBox = document.getElementById("chat-box");
  const messageElem = document.createElement("div");
  messageElem.className = `message ${className}`;
  messageElem.textContent = `${sender}: ${text}`;
  chatBox.appendChild(messageElem);
  chatBox.scrollTop = chatBox.scrollHeight;
}

