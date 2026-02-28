/**
 * ARQUIVO: database.js
 * FUNÇÃO: Armazenar respostas rápidas e comandos de sistema.
 */

const bancoDados = {
    "saudacoes": {
        keywords: ["olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí"],
        resposta: "Olá! Sou o Alexandre. Como posso te ajudar hoje?"
    },
    "nome": {
        keywords: ["seu nome", "quem é você", "como se chama"],
        resposta: "Eu sou o Alexandre, seu assistente pessoal inteligente em desenvolvimento!"
    },
    "horas": {
        keywords: ["que horas são", "horas", "horário"],
        get resposta() {
            const agora = new Date();
            return `Agora são exatamente ${agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}.`;
        }
    },
    "ajuda": {
        keywords: ["ajuda", "o que você faz", "ajudar", "comandos"],
        resposta: "Eu posso te dizer as horas, conversar e pesquisar sobre qualquer personagem, série ou assunto na internet!"
    },
    // COMANDOS DE ABERTURA (OPCIONAL)
    "google": {
        keywords: ["abrir google"],
        resposta: "Abrindo o buscador Google...",
        acao: () => window.open('https://www.google.com', '_blank')
    },
    "youtube": {
        keywords: ["abrir youtube", "ver vídeo"],
        resposta: "Certo, acessando o YouTube.",
        acao: () => window.open('https://www.youtube.com', '_blank')
    }
};

/**
 * Função que verifica apenas o banco local.
 * Se não encontrar, retorna 'null' para o script.js buscar na Web.
 */
function buscarRespostaLocal(mensagemUsuario) {
    const texto = mensagemUsuario.toLowerCase().trim();
    
    for (let categoria in bancoDados) {
        const item = bancoDados[categoria];
        const encontrou = item.keywords.some(keyword => texto.includes(keyword));
        
        if (encontrou) {
            if (item.acao) item.acao();
            return item.resposta;
        }
    }
    return null; // Não achou no arquivo local
}