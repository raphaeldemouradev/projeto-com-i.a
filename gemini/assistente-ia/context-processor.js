/**
 * =================================================================
 * ARQUIVO: context-processor.js
 * SERVE PARA: Gerenciar a "Memória de Curto Prazo" do Alexandre.
 * * FUNCIONAMENTO:
 * 1. Identifica pronomes de referência (ele, ela, onde, nasceu, etc).
 * 2. Injeta o último assunto pesquisado com sucesso na nova pergunta.
 * 3. Garante que um assunto novo apague completamente o anterior.
 * =================================================================
 */

const ContextProcessor = {
    ultimoAssunto: "",

    // Lista expandida para capturar intenções de continuidade
    pronomes: [
        "ele", "ela", "dele", "dela", "isso", "esse", "essa", 
        "aquele", "aquela", "onde", "quando", "quantos", "quem"
    ],

    /**
     * Atualiza o foco da conversa.
     * @param {string} termo - O novo nome ou entidade encontrada.
     */
    salvarContexto(termo) {
        if (!termo || termo.length < 2) return;

        // Limpeza de segurança: remove underlines e espaços extras
        const termoLimpo = termo.replace(/_/g, " ").trim();

        // Se o assunto mudou, atualizamos a memória
        if (this.ultimoAssunto.toLowerCase() !== termoLimpo.toLowerCase()) {
            this.ultimoAssunto = termoLimpo;
            console.log(`%c🧠 CONTEXTO ATUALIZADO: ${this.ultimoAssunto}`, "color: #00ff00; font-weight: bold;");
        }
    },

    /**
     * Analisa a frase do usuário e decide se precisa injetar o contexto.
     * @param {string} pergunta - A frase vinda do chat.
     */
    processar(pergunta) {
        const perguntaMin = pergunta.toLowerCase();
        const palavras = perguntaMin.split(/\s+/); // Divide por espaços
        
        // Verifica se existe algum pronome na pergunta
        const precisaDeContexto = palavras.some(p => this.pronomes.includes(p));

        if (precisaDeContexto && this.ultimoAssunto) {
            console.log(`%c🔄 REFERÊNCIA DETECTADA: Injetando "${this.ultimoAssunto}"`, "color: #00aaff;");
            
            // Retornamos a pergunta original + o reforço do contexto no final
            // Isso ajuda muito o DuckDuckGo e a Wiki a não se perderem
            return `${pergunta} ${this.ultimoAssunto}`;
        }

        return pergunta;
    },

    /**
     * Limpa a memória (útil para comandos de "esquecer" ou reiniciar chat)
     */
    limparContexto() {
        this.ultimoAssunto = "";
        console.log("🧹 Memória de contexto esvaziada.");
    }
};