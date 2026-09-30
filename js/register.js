const apiUrl = 'http://localhost:8080/usuarios' //mudar para localhost antes de iniciar

async function cadastrarUsuario(dadosUsuario) {
    const resposta = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
    }

    // Retorna o objeto JSON do usuário criado retornado pelo backend
    return await resposta.json();
}

document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nomeInput = document.getElementById('nome-cadastro');
    const emailInput = document.getElementById('email-cadastro');
    const senhaInput = document.getElementById('senha-cadastro');

    if (!nomeInput.value || !emailInput.value || !senhaInput.value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const numSenha = Array.from(senhaInput.value);

    if (numSenha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres");
        return;
    }

    const dadosUsuario = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value,
    };

    try {
        // 1. Aguarda a criação do usuário no banco
        const usuarioCriado = await cadastrarUsuario(dadosUsuario);

        // 2. Salva os dados no localStorage convertendo para String JSON
        localStorage.setItem('usuario', JSON.stringify(usuarioCriado));

        // 3. Redireciona a tela
        window.location.assign("map.html");

    } catch (erro) {
        console.error("Erro na operação:", erro);
        alert("Ops! Ocorreu um erro ao salvar. Verifique o console do navegador (F12).");
    }
});