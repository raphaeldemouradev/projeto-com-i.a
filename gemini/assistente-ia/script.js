/*
    * ARQUIVO: script.js
*/

const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const btnEnviar = document.getElementById('btn-enviar');
const btnVoz = document.getElementById('btn-voz');
const btnMute = document.getElementById('btn-mute');

let gravando = false;
let audioAtivado = false; // COMEÇA MUTADO conforme solicitado
let ultimaFalaIA = null; // Armazena a última resposta para retomar

// CONFIGURAÇÃO DE VOZ (OUVIR)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';
recognition.continuous = false; // Para quando você pausa a frase
recognition.interimResults = false;

// Inicializa o ícone de mute conforme o estado
btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
btnMute.style.opacity = "0.5";

// FUNÇÃO PARA FALAR (COM SUPORTE A PAUSA/RETOMADA)
function falarTexto(texto) {
    ultimaFalaIA = texto; // Salva para caso queira desmutar e ouvir
    
    if (!audioAtivado) {
        window.speechSynthesis.cancel();
        return;
    }
    
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

// ALTERNAR MUDO / RETOMAR FALA
btnMute.addEventListener('click', () => {
    audioAtivado = !audioAtivado;
    
    if (audioAtivado) {
        btnMute.innerHTML = '<i class="fas fa-volume-up"></i>';
        btnMute.style.opacity = "1";
        // Se houver uma mensagem da IA na tela, ele retoma a fala daquela mensagem
        if (ultimaFalaIA) falarTexto(ultimaFalaIA);
    } else {
        btnMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btnMute.style.opacity = "0.5";
        window.speechSynthesis.cancel(); // Pausa/Para a voz
    }
});

// LÓGICA DO MICROFONE (LIGA/DESLIGA/RETOMA)
btnVoz.addEventListener('click', () => {
    if (gravando) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch(e) { console.log(e); }
    }
});

recognition.onstart = () => {
    gravando = true;
    btnVoz.classList.add('recording');
};

recognition.onend = () => {
    gravando = false;
    btnVoz.classList.remove('recording');
};

recognition.onresult = (e) => {
    const transcricao = e.results[0][0].transcript;
    // REQUISITO: O texto vai para o campo, não envia direto
    inputField.value += (inputField.value ? " " : "") + transcricao;
};

// FUNÇÃO DE PROCESSAMENTO AO ENVIAR
/**
 * NOVO PROCESSAR ENVIO (Substitua a antiga por esta)
 */
async function processarEnvio() {
    const texto = inputField.value.trim();
    if (!texto) return;

    // 1. Interface: Mostra a mensagem do usuário e limpa o campo
    adicionarBolha(texto, 'user-msg');
    inputField.value = "";

    // 2. Feedback: Cria a bolha de "pensando"
    adicionarBolha("Processando...", 'ai-msg-temp');
    
    try {
        // 3. ORQUESTRAÇÃO: O Orquestrador decide o destino (Local vs Wiki)
        // Certifique-se de que o arquivo main-processor.js está carregado no HTML
        const resultado = await OrquestradorIA.decidirEResponder(texto);
        
        // 4. Limpeza: Remove a bolha de carregamento
        const tempMsg = document.querySelector('.ai-msg-temp');
        if (tempMsg) tempMsg.remove();

        // 5. Resposta: Exibe o conteúdo final e aciona a voz
        adicionarBolha(resultado.conteudo, 'ai-msg');
        falarTexto(resultado.conteudo);
        
    } catch (erro) {
        console.error("Erro no Orquestrador:", erro);
        const tempMsg = document.querySelector('.ai-msg-temp');
        if (tempMsg) tempMsg.remove();
        adicionarBolha("Ops! Tive um problema ao processar essa informação.", 'ai-msg');
    }
}

function adicionarBolha(texto, classe) {
    const div = document.createElement('div');
    div.classList.add('message', classe);
    div.innerText = texto;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// EVENTOS DE ENVIO
btnEnviar.addEventListener('click', processarEnvio);
inputField.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter') processarEnvio(); 
});