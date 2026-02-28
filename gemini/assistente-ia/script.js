/**
 * ARQUIVO: script.js
 * FUNÇÃO: Controle de interface, voz e busca externa com cancelamento de áudio.
 */

const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const btnEnviar = document.getElementById('btn-enviar');
const btnVoz = document.getElementById('btn-voz');
const btnMute = document.getElementById('btn-mute');

let audioAtivado = true;
let gravando = false; // Rastreia o estado do microfone

// CONFIGURAÇÃO DE VOZ (OUVIR)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';
recognition.continuous = false; 

// CONFIGURAÇÃO DE FALA (FALAR)
function falarTexto(texto) {
    if (!audioAtivado) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

// ALTERNAR MUDO
btnMute.addEventListener('click', () => {
    audioAtivado = !audioAtivado;
    btnMute.innerHTML = audioAtivado ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    btnMute.style.opacity = audioAtivado ? "1" : "0.5";
    if (!audioAtivado) window.speechSynthesis.cancel();
});

// FUNÇÃO PARA BUSCAR NA WIKIPEDIA
async function consultarWikipedia(termo) {
    const busca = termo.replace(/quem é|o que é|quem foi|sobre|me fale sobre|personagem/gi, "").trim();
    if (busca.length < 2) return null;

    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(busca)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data.extract; 
    } catch (e) {
        return null;
    }
}

// FUNÇÃO PRINCIPAL DE PROCESSAMENTO
async function processarMensagem(texto) {
    if (texto.trim() === "") return;

    adicionarBolha(texto, 'user-msg');
    inputField.value = "";

    let resposta = buscarRespostaLocal(texto);

    if (resposta) {
        exibirRespostaIA(resposta);
    } else {
        adicionarBolha("Deixe-me consultar meus arquivos...", 'ai-msg-temp');
        const infoWeb = await consultarWikipedia(texto);
        
        const tempMsg = document.querySelector('.ai-msg-temp');
        if (tempMsg) tempMsg.remove();

        if (infoWeb) {
            exibirRespostaIA(infoWeb);
        } else {
            exibirRespostaIA("Desculpe, não encontrei informações detalhadas sobre isso.");
        }
    }
}

function exibirRespostaIA(texto) {
    adicionarBolha(texto, 'ai-msg');
    falarTexto(texto);
}

function adicionarBolha(texto, classe) {
    const div = document.createElement('div');
    div.classList.add('message', classe);
    div.innerText = texto;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ==========================================
// LÓGICA DO MICROFONE (LIGA/DESLIGA)
// ==========================================
btnVoz.addEventListener('click', () => {
    if (gravando) {
        recognition.stop(); // Cancela se já estiver gravando
    } else {
        try {
            recognition.start();
        } catch(e) {
            console.log("Erro ao iniciar: ", e);
        }
    }
});

recognition.onstart = () => {
    gravando = true;
    btnVoz.classList.add('recording');
    inputField.placeholder = "Ouvindo... clique para cancelar";
};

recognition.onend = () => {
    gravando = false;
    btnVoz.classList.remove('recording');
    inputField.placeholder = "Digite ou fale...";
};

recognition.onresult = (e) => {
    const resultado = e.results[0][0].transcript;
    processarMensagem(resultado);
};

// EVENTOS DE BOTÃO ENVIAR E TECLADO
btnEnviar.addEventListener('click', () => processarMensagem(inputField.value));
inputField.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter') processarMensagem(inputField.value); 
});