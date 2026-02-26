const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const btnEnviar = document.getElementById('btn-enviar');
const btnVoz = document.getElementById('btn-voz');
const btnMute = document.getElementById('btn-mute');

let audioAtivado = true;

// 1. CONFIGURAÇÃO DE VOZ (OUVIR)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';

// 2. CONFIGURAÇÃO DE FALA (FALAR)
function falarTexto(texto) {
    if (!audioAtivado) return;
    
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

// 3. ALTERNAR MUDO/SOM
btnMute.addEventListener('click', () => {
    audioAtivado = !audioAtivado;
    if (audioAtivado) {
        btnMute.innerHTML = '<i class="fas fa-volume-up"></i>';
        btnMute.style.opacity = "1";
    } else {
        btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btnMute.style.opacity = "0.5";
        window.speechSynthesis.cancel();
    }
});

// 4. FUNÇÃO DE ENVIO
function enviarMensagem(texto) {
    if (texto.trim() === "") return;

    // Mensagem do usuário
    adicionarBolha(texto, 'user-msg');
    inputField.value = "";

    // Resposta da IA
    setTimeout(() => {
        const resposta = buscarResposta(texto); // Puxa do database.js
        adicionarBolha(resposta, 'ai-msg');
        falarTexto(resposta);
    }, 600);
}

function adicionarBolha(texto, classe) {
    const div = document.createElement('div');
    div.classList.add('message', classe);
    div.innerText = texto;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 5. EVENTOS
btnEnviar.addEventListener('click', () => enviarMensagem(inputField.value));
inputField.addEventListener('keypress', (e) => { if(e.key === 'Enter') enviarMensagem(inputField.value); });

btnVoz.addEventListener('click', () => {
    try { recognition.start(); } catch(e) {}
});

recognition.onstart = () => btnVoz.classList.add('recording');
recognition.onend = () => btnVoz.classList.remove('recording');
recognition.onresult = (e) => enviarMensagem(e.results[0][0].transcript);