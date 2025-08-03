const chatDiv = document.getElementById('chat');
const input = document.getElementById('input');

input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const userMsg = input.value;
    appendMessage(userMsg, 'user');
    input.value = '';
    const response = await getAIResponse(userMsg);
    appendMessage(response, 'bot');
  }
});

function appendMessage(msg, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = msg;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function getAIResponse(message) {
  const res = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer hf_xxx', // HuggingFace key optional
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: message })
  });
  const data = await res.json();
  return data?.[0]?.generated_text || "No response.";
}
