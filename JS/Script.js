document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('duplicarBtn');        
  const wrapper = document.getElementById('formsWrapper');  
  const formularioOriginal = document.getElementById('formOrcamento');

  if (!botao) return console.error("Botão '#duplicarBtn' não encontrado.");
  if (!wrapper) return console.error("Wrapper '#formsWrapper' não encontrado.");
  if (!formularioOriginal) return console.error("Formulário '#formOrcamento' não encontrado.");

  if (formularioOriginal.parentElement !== wrapper) {
    wrapper.appendChild(formularioOriginal);
  }


  function criarBotaoExcluir(form) {
    if (form.querySelector('.btn-excluir')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-excluir';
    btn.textContent = 'Excluir';
    btn.style.marginLeft = '8px';
    form.appendChild(btn);
  }


  function renumerarTitulos() {
    const forms = wrapper.querySelectorAll('form');
    forms.forEach((f, i) => {

      let h = f.querySelector('h3');
      if (!h) {
        h = document.createElement('h3');
        f.prepend(h);
      }
      h.textContent = `ORÇAMENTO ${i + 1}`;
    });
  }

  criarBotaoExcluir(formularioOriginal);
  renumerarTitulos();


  wrapper.addEventListener('click', (e) => {
    const btn = e.target;
    if (!btn.classList.contains('btn-excluir')) return;


    const form = btn.closest('form');
    if (!form) return;


    const total = wrapper.querySelectorAll('form').length;
    if (total === 1) {
      
      form.querySelectorAll('input, select, textarea').forEach(i => i.value = '');
      renumerarTitulos();
      return;
    }
    form.style.transition = 'all 0.25s ease';
    form.style.opacity = '0';
    form.style.transform = 'translateY(10px)';
    setTimeout(() => {
      form.remove();
      renumerarTitulos();
    }, 250);
  });
   botao.addEventListener('click', () => {
    try {
      const total = wrapper.querySelectorAll('form').length + 1;
      const novo = formularioOriginal.cloneNode(true);

     
      novo.id = `formOrcamento_${total}`;

     
      novo.querySelectorAll('input, textarea').forEach(i => i.value = '');
      novo.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
      novo.querySelectorAll('.btn-excluir').forEach(b => b.remove());
      let h = novo.querySelector('h3');
      if (!h) {
        h = document.createElement('h3');
        novo.prepend(h);
      }

      h.textContent = `ORÇAMENTO ${total}`;
      criarBotaoExcluir(novo);
      wrapper.appendChild(novo);

      novo.style.opacity = '0';
      novo.style.transform = 'translateY(10px)';
      setTimeout(() => {
        novo.style.transition = 'all 0.25s ease';
        novo.style.opacity = '1';
        novo.style.transform = 'translateY(0)';
      }, 20);
    } catch (err) {
      console.error('Erro ao duplicar o formulário:', err);
    }
  });
});

const enviarBtn = document.getElementById('enviarBtn');
const mensagem = document.getElementById('mensagem');

if (enviarBtn && mensagem) {
  enviarBtn.addEventListener('click', () => {
    const cliente = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
    };

    
    if (!cliente.nome || !cliente.email || !cliente.telefone) {
      mensagem.textContent = '⚠️ Preencha os dados do cliente antes de enviar.';
      mensagem.style.color = 'red';
      return;
    }
    const forms = document.querySelectorAll('#formsWrapper form');
    const orcamentos = [];

    forms.forEach((form) => {
      const servico = form.querySelector('[name="servico"]').value;
      const descricao = form.querySelector('[name="descricao"]').value;
      const quantidade = form.querySelector('[name="quantidade"]').value;
      const observacao = form.querySelector('[name="observacao"]').value;

      if (servico && descricao && quantidade) {
        orcamentos.push({ servico, descricao, quantidade, observacao });
      }
    });

    if (orcamentos.length === 0) {
      mensagem.textContent = '⚠️ Adicione e preencha pelo menos um orçamento antes de enviar.';
      mensagem.style.color = 'red';
      return;
    }
    console.log("📦 Dados enviados:", { cliente, orcamentos });

    mensagem.textContent = '✅ Orçamentos enviados com sucesso!';
    mensagem.style.color = 'green';
    forms.forEach(f => f.querySelectorAll('input, textarea, select').forEach(el => el.value = ''));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('formsWrapper');

  // Detecta qualquer mudança no campo "Pré-Cadastro"
  wrapper.addEventListener('change', (event) => {
    if (event.target.name === 'servico') {
      const form = event.target.closest('form'); // o form atual
      const valor = event.target.value.toLowerCase();

      const descricao = form.querySelector('input[name="descricao"]');
      const cor = form.querySelector('select[name="cor"]');
      const substrato = form.querySelector('input[name="substrato"]');
      const acabamento = form.querySelector('input[name="acabamento"]');
      const observacao = form.querySelector('textarea[name="observacao"]');

      // 🔹 Limpa campos antes de preencher
      descricao.value = '';
      substrato.value = '';
      acabamento.value = '';
      observacao.value = '';

      // 🔹 Preenche automaticamente conforme o serviço
      if (valor === 'banner') {
        descricao.value = 'Banner';
        substrato.value = 'Lona'
        acabamento.value =  'bastão e corda ou ilhós'
        cor.value = '4x0';
      } 
      else if (valor === 'faixa') {
        descricao.value = 'Faixa';
        substrato.value = 'Lona';
        acabamento.value = 'bastão e corda ou ilhós';
        cor.value = '4x0';
      }
    }
  });
});
