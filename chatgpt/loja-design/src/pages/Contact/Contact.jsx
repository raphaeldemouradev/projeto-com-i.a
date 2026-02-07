import "./Contact.css"

function Contact() {
  return (
    <section className="contact">
      <h2>Contato</h2>
      <p>Precisa de ajuda? Fale com a gente 👇</p>

      <form className="contact-form">
        <input
          type="text"
          placeholder="Seu nome"
          required
        />

        <input
          type="email"
          placeholder="Seu e-mail"
          required
        />

        <select required>
          <option value="">Selecione o motivo do contato</option>
          <option value="pedido_nao_chegou">Pedido não chegou</option>
          <option value="erro_pagamento">Erro no pagamento</option>
          <option value="troca">Desejo trocar o pedido</option>
          <option value="outro">Outro assunto</option>
        </select>

        <textarea
          placeholder="Descreva o problema ou dúvida"
          rows="4"
          required
        />

        <button type="submit">
          Enviar mensagem
        </button>
      </form>
    </section>
  )
}

export default Contact
