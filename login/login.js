
function validarLogin(event) {
    event.preventDefault();
    
    // Obter valores dos campos
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    // Remover mensagens anteriores
    const mensagemAnterior = document.querySelector('.mensagem');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Validação simples
    if (!email || !senha) {
        exibirMensagem('Por favor, preencha todos os campos.', 'erro');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        exibirMensagem('Por favor, insira um email válido.', 'erro');
        return;
    }
    if (senha.length < 6) {
        exibirMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
        return;
    }
    exibirMensagem('Login realizado com sucesso! Redirecionando...', 'sucesso');
    
    // Redirecionar após 2 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Função para exibir mensagens
function exibirMensagem(texto, tipo) {
    const formulario = document.getElementById('formularioLogin');
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem ${tipo}`;
    mensagem.textContent = texto;
    

    formulario.insertBefore(mensagem, formulario.firstChild);
}

document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formularioLogin');
    formularioLogin.addEventListener('submit', validarLogin);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
        exibirMensagem('Logout realizado com sucesso.', 'sucesso');
    }
});