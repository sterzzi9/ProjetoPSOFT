const apiUrl = 'http://localhost:8080/login/login';

document.getElementById("loginForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    try {
        const resposta = await fetch(apiUrl, { //mudar para localhost antes de iniciar
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        });

        if (resposta.ok) {
            // Agora 'resposta.json()' funcionará pois o Java enviará o objeto do Usuário
            const usuarioLogado = await resposta.json();
            localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
            window.location.assign("map.html");
        } 
        else if (resposta.status === 401) {
            alert("Credenciais incorretas.");
        } 
        else {
            alert("Ocorreu um erro no servidor.");
        }

    } catch (erro) {
        console.error('Erro de conexão:', erro);
    }
});