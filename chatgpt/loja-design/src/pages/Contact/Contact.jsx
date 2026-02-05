import "./Contact.css"

function Contact() {
  return (
    <div className="contact-page">
      <h2>Fale conosco</h2>

      <p>
        Precisa de ajuda com seu pedido?
        Preencha o formulário abaixo.
      </p>

      <form>
        <input placeholder="Nome" required />
        <input placeholder="Email" required />
        <select>
          <option>Dúvida sobre pedido</option>
          <option>Pedido não chegou</option>
          <option>Erro na compra</option>
          <option>Troca / cancelamento</option>
        </select>
        <textarea placeholder="Explique sua situação" />

        <button>Enviar mensagem</button>
      </form>
    </div>
  )
}

export default Contact
