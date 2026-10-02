const apiUrl = 'http://localhost:8080/usuarios';

async function cadastrarUsuario(dadosUsuario) {
    const resposta = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
    }

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

    // 1. Verificação de e-mail existente
    try {
        const resposta = await fetch(apiUrl);
        const usuarios = await resposta.json(); // Faltava o 'await' aqui

        // .some() verifica se existe ao menos um e-mail idêntico ao digitado (.value)
        const emailJaExiste = usuarios.some(u => u.email === emailInput.value.trim());

        if (emailJaExiste) {
            alert("Este e-mail já está em uso!");
            return; // Interrompe o envio e impede o cadastro duplicado
        }
    } catch (erro) {
        console.error("Ocorreu um erro ao verificar o e-mail:", erro);
        alert("Erro ao validar dados com o servidor. Tente novamente.");
        return;
    }

    // 2. Validação de senha (usando .length direto da String)
    if (senhaInput.value.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres");
        return;
    }

    const dadosUsuario = {
        nome: nomeInput.value,
        email: emailInput.value.trim(),
        senha: senhaInput.value,
    };

    // 3. Cadastro do usuário
    try {
        const usuarioCriado = await cadastrarUsuario(dadosUsuario);

        localStorage.setItem('usuario', JSON.stringify(usuarioCriado));

        window.location.assign("map.html");

    } catch (erro) {
        console.error("Erro na operação:", erro);
        alert("Ops! Ocorreu um erro ao salvar. Verifique o console do navegador (F12).");
    }
});