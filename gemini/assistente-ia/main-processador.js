/**
 * ARQUIVO: main-processor.js
 * ORDEM: Local -> DuckDuckGo -> Wikipédia
 */
const OrquestradorIA = {
    async decidirEResponder(textoBruto) {
        const texto = textoBruto.toLowerCase().trim();

        // --- 1. PRIMEIRO: BANCO LOCAL ---
        if (typeof buscarRespostaLocal === "function") {
            const respLocal = buscarRespostaLocal(texto);
            if (respLocal) return { conteudo: respLocal };
        }

        // --- 2. SEGUNDO: DUCKDUCKGO (Busca Web) ---
        try {
            if (typeof DuckProcessor !== "undefined") {
                const respDuck = await DuckProcessor.executarBusca(textoBruto);
                if (respDuck) return { conteudo: `[Web]: ${respDuck}` };
            }
        } catch (e) { console.error("Erro DuckDuckGo"); }

        // --- 3. TERCEIRO: WIKIPÉDIA (Enciclopédia) ---
        try {
            if (typeof WikiProcessor !== "undefined") {
                const respWiki = await WikiProcessor.executarBusca(textoBruto);
                if (respWiki) return { conteudo: `[Wiki]: ${respWiki}` };
            }
        } catch (e) { console.error("Erro Wikipédia"); }

        // FALLBACK
        return { conteudo: "Não encontrei informações sobre isso. Pode tentar de outro modo?" };
    }
};