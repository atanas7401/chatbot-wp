const apiKey = "YOUR_API_KEY_HERE"; // заменете с предоставения ключ
const contact = "\uD83D\uDCDE \u0415\u0412\u0420\u041E \u041F\u0420\u041E\u0415\u041A\u0422 \u041A\u041E\u041C\u0415\u0420\u0421 \u0415\u041E\u041E\u0414\n\u260E\uFE0F 0877 887 673\n\u2709\uFE0F atanas7401@gmail.com";
const systemPrompt = "Ти си полезен GPT-4o асистент на български.";
let history = [{role: 'system', content: systemPrompt}];

function toggle() {
    const win = document.getElementById('chat-window');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = cls;
    div.textContent = text;
    document.getElementById('messages').appendChild(div);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function send() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';

    // ако потребителят казва "благодаря", "чао" или "довиждане"
    const farewell = /(\bблагодаря\b|\bчао\b|\bдовиждане\b)/i.test(text);
    const payload = { model: 'gpt-4o', messages: history.concat({role: 'user', content: text}) };

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
        body: JSON.stringify(payload)
    })
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(data => {
        let answer = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (!answer || !answer.trim()) {
            addMessage(contact, 'bot');
            return;
        }
        history.push({role:'user', content:text});
        history.push({role:'assistant', content:answer});
        if (farewell) answer += '\n\n' + contact;
        addMessage(answer, 'bot');
    })
    .catch(() => {
        addMessage(contact, 'bot');
    });
}

document.getElementById('toggle-btn').addEventListener('click', toggle);
document.getElementById('send-btn').addEventListener('click', send);
document.getElementById('user-input').addEventListener('keypress', (e)=>{ if(e.key==='Enter') send(); });
// PR test
