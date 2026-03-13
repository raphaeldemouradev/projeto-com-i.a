/**
 * ARQUIVO: duck-processor.js
 * FUNÇÃO: Limpar o termo de busca para o DuckDuckGo
 */
const DuckProcessor = {
    limparPergunta(texto) {
        let termo = texto.toLowerCase().trim();
        const ruidos = [
            "o que é", "quem é", "o que é a", "quem foi", "me fale sobre", 
            "defina", "significado de", "pesquise", "procure por",
            "quem fundou a", "quem fundou", "quem criou a", "quem criou",
            "quando nasceu", "onde nasceu",
        ];
        
        ruidos.forEach(r => termo = termo.replace(r, ""));
        return termo.trim();
    },

    async executarBusca(pergunta) {
        const termoLimpo = this.limparPergunta(pergunta);
        if (!termoLimpo) return null;

        // Chama a Engine que já criamos
        const resultado = await DuckEngine.buscar(termoLimpo);
        return resultado ? resultado.resumo : null;
    }
};