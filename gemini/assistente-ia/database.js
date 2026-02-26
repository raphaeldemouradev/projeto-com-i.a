const bancoDados = {
    "saudacoes": {
        keywords: ["olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí"],
        resposta: "Olá! Sou seu assistente virtual. Como posso te ajudar agora?"
    },
    "nome": {
        keywords: ["seu nome", "quem é você", "como se chama"],
        resposta: "Eu sou o Alexandre, seu assistente pessoal em desenvolvimento!"
    },
    "horas": {
        keywords: ["horas", "que horas são", "horário"],
        resposta: `Agora são exatamente ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}.`
    },
    "clima": {
        keywords: ["tempo", "clima", "vai chover"],
        resposta: "Eu ainda não tenho acesso à internet para ver a previsão, mas espero que o dia esteja bonito!"
    },
    "ajuda": {
        keywords: ["ajuda", "o que você faz", "ajudar"],
        resposta: "Eu posso te dizer as horas, conversar um pouco e mudar as cores do sistema!"
    }
};

// Resposta padrão caso ele não entenda
const respostaPadrao = "Interessante... mas ainda estou aprendendo sobre isso. Pode perguntar de outro jeito?";

// Função para buscar a resposta
function buscarResposta(mensagemUsuario) {
    const texto = mensagemUsuario.toLowerCase();
    
    for (let categoria in bancoDados) {
        const encontrou = bancoDados[categoria].keywords.some(keyword => texto.includes(keyword));
        if (encontrou) {
            return bancoDados[categoria].resposta;
        }
    }
    return respostaPadrao;
}