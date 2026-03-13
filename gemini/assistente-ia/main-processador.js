/**
 * ARQUIVO: main-processor.js
 * FUNÇÃO: Orquestrador central com gerenciamento de contexto persistente.
 * ORDEM: 1. Local -> 2. DuckDuckGo -> 3. Wikipédia
 */

const OrquestradorIA = {
    async decidirEResponder(textoBruto) {
        if (!textoBruto) return { conteudo: "..." };

        // --- 1. PROCESSAMENTO DE CONTEXTO ---
        // Verifica se a pergunta usa pronomes (ele, ela, etc) e injeta o assunto anterior
        const perguntaAjustada = ContextProcessor.processar(textoBruto);
        console.log("💬 Pergunta processada:", perguntaAjustada);

        // --- 2. TENTATIVA NO BANCO LOCAL ---
        if (typeof buscarRespostaLocal === "function") {
            const respostaLocal = buscarRespostaLocal(textoBruto);
            if (respostaLocal) {
                console.log("Fonte: Banco Local");
                return { conteudo: respostaLocal };
            }
        }

        // --- 3. TENTATIVA DUCKDUCKGO (Busca Web Direta) ---
        try {
            if (typeof DuckProcessor !== "undefined") {
                // Para o Duck, enviamos a pergunta com contexto para melhor precisão
                const respDuck = await DuckProcessor.executarBusca(perguntaAjustada);
                
                if (respDuck) {
                    console.log("Fonte: DuckDuckGo");
                    
                    // ATUALIZAÇÃO DE CONTEXTO: Pegamos o que foi pesquisado e limpamos
                    const termoPesquisado = DuckProcessor.limparPergunta(textoBruto);
                    ContextProcessor.salvarContexto(termoPesquisado);

                    return { conteudo: `[Web]: ${respDuck}` };
                }
            }
        } catch (e) {
            console.error("Erro no fluxo DuckDuckGo:", e);
        }

        // --- 4. TENTATIVA WIKIPÉDIA (Enciclopédia) ---
        try {
            if (typeof WikiProcessor !== "undefined") {
                const respWiki = await WikiProcessor.executarBusca(perguntaAjustada);
                
                if (respWiki) {
                    console.log("Fonte: Wikipédia");

                    // ATUALIZAÇÃO DE CONTEXTO: Formata o termo da Wiki para texto legível
                    // Ex: "Gabriel_Jesus" vira "Gabriel Jesus"
                    const termoWiki = WikiProcessor.prepararTermo(textoBruto);
                    if (termoWiki) {
                        ContextProcessor.salvarContexto(termoWiki.replace(/_/g, " "));
                    }

                    return { conteudo: `[Wiki]: ${respWiki}` };
                }
            }
        } catch (e) {
            console.error("Erro no fluxo Wikipédia:", e);
        }

        // --- 5. FALLBACK FINAL ---
        return { 
            conteudo: "Não encontrei informações sobre isso. Tente ser mais específico no nome do assunto." 
        };
    }
};