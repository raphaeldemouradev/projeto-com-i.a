/**
 * Lógica para gerenciar a Janela Flutuante (PiP)
 */
const PipController = {
    async ativarSegundoPlano() {
        if (!('documentPictureInPicture' in window)) {
            alert("Navegador não suporta PiP.");
            return;
        }

        try {
            const pipWindow = await window.documentPictureInPicture.requestWindow({
                width: 350,
                height: 500,
            });

            const chatCard = document.querySelector('.chat-card');

            // Importante: Copiar o CSS específico da pasta /picture
            const linkStyle = pipWindow.document.createElement('link');
            linkStyle.rel = 'stylesheet';
            linkStyle.href = 'picture/pip-style.css'; // Caminho para o novo arquivo
            pipWindow.document.head.append(linkStyle);

            // Também precisamos copiar o FontAwesome para os ícones aparecerem
            const fontAwesome = document.querySelector('link[href*="font-awesome"]')?.cloneNode();
            if (fontAwesome) pipWindow.document.head.append(fontAwesome);

            // Move o chat
            pipWindow.document.body.append(chatCard);

            // Devolve o chat se fechar a janelinha
            pipWindow.addEventListener("pagehide", () => {
                document.querySelector('body').prepend(chatCard);
            });

        } catch (err) {
            console.error("Falha ao abrir PiP:", err);
        }
    }
};

// Vincula ao botão da interface
document.getElementById('btn-pip').addEventListener('click', () => {
    PipController.ativarSegundoPlano();
});