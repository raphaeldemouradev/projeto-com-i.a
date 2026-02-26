/**
 * ARQUIVO: script.js
 * FUNÇÃO: Controle de interface, voz e lógica de interação.
 */

const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const btnEnviar = document.getElementById('btn-enviar');
const btnVoz = document.getElementById('btn-voz');

// 1. CONFIGURAÇÃO DE RECONHECIMENTO DE VOZ (OUVIR)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'pt-BR';
recognition.continuous = false; // Para de ouvir quando o usuário faz uma pausa
recognition.interimResults = false; // Só retorna o texto final da frase

// 2. FUNÇÃO PARA A IA FALAR (SÍNTESE DE VOZ)
function falarTexto(texto) {
    // Cancela qualquer fala que esteja acontecendo agora
    window.speechSynthesis.cancel();
    
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    mensagem.rate = 1.6; // Velocidade da fala (0.1 a 10)
    mensagem.pitch = 1;  // Tom da voz (0 a 2)
    
    window.speechSynthesis.speak(mensagem);
}

// 3. FUNÇÃO PARA ADICIONAR MENSAGENS NA TELA
function adicionarMensagem(texto, tipo) {
    const div = document.createElement('div');
    div.classList.add('message', tipo);
    div.innerText = texto;
    
    chatWindow.appendChild(div);
    
    // Scroll automático para a última mensagem
    chatWindow.scrollTo({
        top: chatWindow.scrollHeight,
        behavior: 'smooth'
    });
}

// 4. LÓGICA DE PROCESSAMENTO DA MENSAGEM
function processarMensagem(texto) {
    if (texto.trim() === "") return;

    // Adiciona a mensagem do usuário na tela
    adicionarMensagem(texto, 'user-msg');
    inputField.value = "";

    // Simula o tempo de "pensamento" da IA
    setTimeout(() => {
        // buscarResposta() vem do seu arquivo database.js
        const resposta = buscarResposta(texto); 
        
        adicionarMensagem(resposta, 'ai-msg');
        falarTexto(resposta);
    }, 700);
}

// 5. EVENTOS DE INTERAÇÃO (CLIQUE E TECLADO)

// Enviar ao clicar no botão de seta
btnEnviar.addEventListener('click', () => {
    processarMensagem(inputField.value);
});

// Enviar ao apertar a tecla Enter
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processarMensagem(inputField.value);
    }
});

// Controle do Microfone
btnVoz.addEventListener('click', () => {
    try {
        recognition.start();
    } catch (error) {
        console.error("O reconhecimento já está ativo.");
    }
});

// Quando o microfone começa a ouvir
recognition.onstart = () => {
    btnVoz.classList.add('recording');
    inputField.placeholder = "Ouvindo...";
};

// Quando o microfone termina de ouvir com sucesso
recognition.onresult = (event) => {
    const textoFulado = event.results[0][0].transcript;
    processarMensagem(textoFulado);
};

// Quando o microfone desliga (por erro ou fim de fala)
recognition.onend = () => {
    btnVoz.classList.remove('recording');
    inputField.placeholder = "Digite ou fale...";
};

// Tratamento de erros de áudio
recognition.onerror = (event) => {
    console.error("Erro no microfone: ", event.error);
    btnVoz.classList.remove('recording');
};