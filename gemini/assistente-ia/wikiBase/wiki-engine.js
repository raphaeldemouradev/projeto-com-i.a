/**
 * ARQUIVO: wiki-engine.js
 * FUNÇÃO: Comunicação direta com a API da Wikipedia
 */
const WikiEngine = {
    baseUrl: "https://pt.wikipedia.org/api/rest_v1/page/summary/",

    async buscar(termo) {
        if (!termo) return null;

        // encodeURIComponent garante que espaços e acentos não quebrem a URL
        const url = this.baseUrl + encodeURIComponent(termo);

        try {
            const response = await fetch(url);
            
            // Se a página não existir (404), retorna null
            if (!response.ok) return null;

            const data = await response.json();

            // Retornamos um objeto organizado com o que a API nos dá
            return {
                resumo: data.extract,  // O texto principal
                titulo: data.title,    // O título oficial da página
                imagem: data.thumbnail ? data.thumbnail.source : null // Opcional: link da foto
            };
        } catch (error) {
            console.error("Erro na requisição WikiEngine:", error);
            return null;
        }
    }
};