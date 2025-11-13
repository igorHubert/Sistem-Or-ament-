document.addEventListener("DOMContentLoaded", () => {
  const listaEmails = document.getElementById("listaEmails");
  const tituloDetalhe = document.getElementById("tituloDetalhe");
  const conteudoDetalhe = document.getElementById("conteudoDetalhe");
  const responderBtn = document.getElementById("responderBtn");

  const modal = document.getElementById("modalNovo");
  const novoBtn = document.getElementById("novoOrcamentoBtn");
  const cancelarBtn = document.getElementById("cancelarBtn");
  const form = document.getElementById("formOrcamento");

  let orcamentos = [];

  // 🔹 Redirecionar para o index.html ao clicar no botão
  novoBtn.addEventListener("click", () => {
    window.location.href = "Orçamento.html";
  });

  // 🔹 Fechar modal (caso ainda esteja na página)
  if (cancelarBtn) {
    cancelarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // 🔹 Enviar orçamento (caso o formulário exista nesta página)
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const novo = {
        id: Date.now(),
        nome: data.nome,
        email: data.email,
        mensagem: data.mensagem,
        data: new Date().toLocaleString()
      };
      orcamentos.push(novo);
      form.reset();
      modal.style.display = "none";
      atualizarLista();
    });
  }

  // 🔹 Atualizar lista lateral
  function atualizarLista() {
    listaEmails.innerHTML = "";
    orcamentos.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.email}`;
      li.addEventListener("click", () => abrirDetalhe(item));
      listaEmails.appendChild(li);
    });
  }

  // 🔹 Exibir detalhes
  function abrirDetalhe(item) {
    tituloDetalhe.textContent = `Orçamento de ${item.nome}`;
    conteudoDetalhe.innerHTML = `
      <p><strong>Email:</strong> ${item.email}</p>
      <p><strong>Data:</strong> ${item.data}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${item.mensagem}</p>
    `;
    responderBtn.style.display = "block";
  }

  responderBtn.addEventListener("click", () => {
    alert("Função de resposta será adicionada futuramente 😄");
  });
});
