/**
 * ARQUIVO: duck-engine.js
 * FUNÇÃO: Buscar respostas rápidas no DuckDuckGo
 */
const DuckEngine = {
    // URL da API gratuita do DuckDuckGo
    baseUrl: "https://api.duckduckgo.com/?format=json&q=",

    async buscar(termo) {
        if (!termo) return null;

        const url = this.baseUrl + encodeURIComponent(termo);

        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();

            // O DuckDuckGo retorna a resposta em 'AbstractText' ou 'Answer'
            const respostaRaiz = data.AbstractText || data.Answer;

            if (respostaRaiz) {
                return {
                    resumo: respostaRaiz,
                    fonte: data.AbstractSource || "Busca Web"
                };
            }
            return null;
        } catch (error) {
            console.error("Erro na DuckEngine:", error);
            return null;
        }
    }
};