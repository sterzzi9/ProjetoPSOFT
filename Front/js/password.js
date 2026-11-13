const apiURL = 'http://localhost:8080/usuarios';

const formReport = document.getElementById('changePassword');

if (formReport) {
    formReport.addEventListener('submit', async function (e) {
        e.preventDefault();

        const usuarioLocalStorage = localStorage.getItem('usuario');
        let usuarioLogadoNome = null;
        let usuarioLogadoEmail = null;
        let usuarioLogadoSenha = null;
        let usuarioLogadoId = null;

        // 1. Tenta recuperar dados do localStorage
        if (usuarioLocalStorage) {
            try {
                const usuarioObj = JSON.parse(usuarioLocalStorage);
                usuarioLogadoNome = usuarioObj.nome;
                usuarioLogadoEmail = usuarioObj.email;
                usuarioLogadoSenha = usuarioObj.senha;
                usuarioLogadoId = usuarioObj.id;
            } catch (err) {
                console.error("Erro ao converter o usuário do localStorage:", err);
            }
        }

        // 2. Caso não esteja no localStorage, pega o valor do campo HTML
        if (!usuarioLogadoEmail) {
            const inputEmail = document.getElementById("email");
            if (inputEmail) {
                usuarioLogadoEmail = inputEmail.value.trim();
            }
        }

        // Validação: precisa informar um e-mail no formulário
        if (!usuarioLogadoEmail) {
            alert("Por favor, preencha o campo de e-mail.");
            return;
        }

        const senhaNova = document.getElementById('senhaNova').value;
        const senhaDenovo = document.getElementById('senhaDenovo').value;

        // 3. Validações de Senha
        if (senhaNova !== senhaDenovo) {
            alert("As senhas devem ser iguais.");
            return;
        }

        if (senhaNova.length < 8) {
            alert("A senha deve ter no mínimo 8 caracteres.");
            return;
        }

        if (usuarioLogadoSenha && senhaNova === usuarioLogadoSenha) {
            alert("A nova senha não pode ser igual à senha atual.");
            return;
        }

        // 4. Execução e validação com a API
        try {
            // Se não tivermos o ID (usuário deslogado), verificamos primeiro se o e-mail existe na API
            if (!usuarioLogadoId) {
                const usuarioEncontrado = await buscarUsuarioPorEmail(usuarioLogadoEmail);

                if (!usuarioEncontrado) {
                    alert("E-mail não cadastrado no sistema. Verifique o e-mail digitado.");
                    return; // Interrompe e NÃO faz o PUT
                }

                // Recupera o ID e nome do usuário retornado do banco para montar a requisição
                usuarioLogadoId = usuarioEncontrado.id;
                usuarioLogadoNome = usuarioEncontrado.nome || usuarioLogadoNome;
            }

            // Dados atualizados para enviar
            const dadosUsuario = {
                nome: usuarioLogadoNome,
                email: usuarioLogadoEmail,
                senha: senhaNova
            };

            // Executa o PUT apenas se tiver o ID (garantido pela verificação acima)
            await atualizarSenha(usuarioLogadoId, dadosUsuario);

            localStorage.removeItem('usuario');
            alert("Senha alterada com sucesso!");
            window.location.assign("login.html");

        } catch (erro) {
            console.error("Erro na operação:", erro);
            alert("Erro ao alterar senha: " + erro.message);
        }
    });
}

// Busca o usuário pelo e-mail antes de permitir a alteração
async function buscarUsuarioPorEmail(email) {
    const resposta = await fetch(`${apiURL}?email=${encodeURIComponent(email)}`);
    
    if (!resposta.ok) {
        if (resposta.status === 404) return null;
        throw new Error("Erro ao consultar e-mail no servidor.");
    }

    const dados = await resposta.json();
    
    // Tratamento para APIs que retornam array (ex: JSON-Server) ou objeto único
    if (Array.isArray(dados)) {
        return dados.length > 0 ? dados[0] : null;
    }
    
    return dados;
}

// Requisição PUT com validação de status HTTP
async function atualizarSenha(id, dadosUsuario) {
    const resposta = await fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    if (!resposta.ok) {
        if (resposta.status === 404) {
            throw new Error("Usuário não encontrado para atualização.");
        }
        throw new Error("Falha ao atualizar a senha no servidor.");
    }

    return await resposta.json();
}

function logout() {
    const linkLogout = document.getElementById('logout');

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuario');
            window.location.assign("index.html");
        });
    }
}