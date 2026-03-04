/**
 * ARQUIVO: wiki.js
 * FUNÇÃO: Motor de busca global via Wikipedia API
 */

const WikiEngine = {
    // Configurações da API
    baseUrl: "https://pt.wikipedia.org/api/rest_v1/page/summary/",

    /**
     * Limpa o texto do usuário para focar no termo de busca
     */
    prepararTermo(texto) {
        return texto
            .toLowerCase()
            .replace(/quem é|o que é|quem foi|sobre|me fale sobre|pesquise|procure/gi, "")
            .trim();
    },

    /**
     * Busca o conteúdo de forma assíncrona
     */
    async buscar(termoOriginal) {
        const termoLimpo = this.prepararTermo(termoOriginal);
        
        if (termoLimpo.length < 2) return null;

        try {
            const response = await fetch(this.baseUrl + encodeURIComponent(termoLimpo));
            
            if (!response.ok) {
                // Se não achou com o termo exato, a API retorna 404
                return null;
            }

            const data = await response.json();

            // Retornamos um objeto organizado para o Alexandre usar
            return {
                titulo: data.title,
                resumo: data.extract,
                imagem: data.thumbnail ? data.thumbnail.source : null,
                link: data.content_urls.desktop.page
            };
        } catch (error) {
            console.error("Erro na busca global:", error);
            return null;
        }
    }
};