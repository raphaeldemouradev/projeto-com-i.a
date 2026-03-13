/**
 * ARQUIVO: wiki-processor.js
 * FUNÇÃO: Tratar o texto especificamente para a Wikipédia e gerenciar erros.
 */
const WikiProcessor = {
    
    // 1. Limpa o texto e prepara o termo (Ex: "O que é IA" -> "Inteligência_artificial")
    prepararTermo(textoBruto) {
        if (!textoBruto) return "";

        let termo = textoBruto.toLowerCase().trim();

        // Dicionário de atalhos para termos que a Wiki tem dificuldade
        const atalhos = {
            "ia": "Inteligência_artificial",
            "ai": "Inteligência_artificial",
            "ti": "Tecnologia_da_informação",
            "cr7": "Cristiano_Ronaldo"
        };

        // Se o usuário digitou exatamente uma dessas siglas, já retorna o termo correto
        if (atalhos[termo]) return atalhos[termo];

        // Remove palavras que "sujam" a pesquisa enciclopédica
        const ruidos = [
            "o que é", "quem é", "o que é a", "quem foi", "me fale sobre", 
            "defina", "significado de", "pesquise", "procure por",
            "quem fundou a", "quem fundou", "quem criou a", "quem criou",
            "quando nasceu", "onde nasceu",
        ];

        ruidos.forEach(ruido => {
            termo = termo.replace(ruido, "");
        });

        termo = termo.trim();

        // Se após a limpeza o termo ficou vazio, retorna null
        if (!termo) return null;

        // Capitaliza para o padrão Wiki (Primeira Letra Maiúscula de cada palavra)
        // Ex: "buraco negro" -> "Buraco_Negro"
        return termo.trim().split(' ')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join('_'); // A Wiki prefere Underline no lugar de espaço na URL
    },

    async executarBusca(pergunta) {
        try {
            const termoPronto = this.prepararTermo(pergunta);
            
            // Se não sobrou termo nenhum para pesquisar, sai discretamente
            if (!termoPronto) return null;

            console.log("Tentando Wikipédia para:", termoPronto);

            // Verifica se o motor (WikiEngine) existe antes de chamar
            if (typeof WikiEngine === "undefined") {
                console.error("Erro: WikiEngine não foi carregado no HTML!");
                return null;
            }

            const resultado = await WikiEngine.buscar(termoPronto);

            // Retorna apenas o resumo (string) para o Orquestrador
            if (resultado && resultado.resumo) {
                return resultado.resumo;
            }

            return null; // Não achou artigo correspondente

        } catch (erro) {
            console.error("Erro interno no WikiProcessor:", erro);
            return null;
        }
    }
};