document.addEventListener("DOMContentLoaded", () => {
    // Referências aos elementos do HTML (Menu)
    const btnAbrir = document.getElementById("abrir-menu");
    const btnFechar = document.getElementById("fechar-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const fundoEscuro = document.getElementById("fundo-escuro");

    // Função para abrir o menu
    function abrirMenu() {
        if (menuLateral) {
            menuLateral.style.width = "260px";
        }
        if (fundoEscuro) {
            fundoEscuro.style.display = "block";
        }
    }

    // Função para fechar o menu
    function fecharMenu() {
        if (menuLateral) {
            menuLateral.style.width = "0";
        }
        if (fundoEscuro) {
            fundoEscuro.style.display = "none";
        }
    }

    // Eventos de clique do menu
    if (btnAbrir) {
        btnAbrir.addEventListener("click", abrirMenu);
    }

    if (btnFechar) {
        btnFechar.addEventListener("click", fecharMenu);
    }

    if (fundoEscuro) {
        fundoEscuro.addEventListener("click", fecharMenu);
    }

    // ==========================================
    // CARREGAR DADOS DO USUÁRIO LOGADO
    // ==========================================
    function carregarDadosUsuario() {
        // Busca a chave 'usuario' salva no localStorage
        const usuarioStorage = localStorage.getItem("usuario");

        if (usuarioStorage) {
            try {
                // Converte de JSON para objeto
                const usuario = JSON.parse(usuarioStorage);

                // Referências aos campos do formulário de perfil
                const inputNome = document.getElementById("txt-nome");
                const inputEmail = document.getElementById("txt-email");
                const inputUser = document.getElementById("txt-user");
                const inputSenha = document.getElementById("txt-senha");

                // Preenche o campo 'Nome completo'
                if (inputNome && usuario.nome) {
                    inputNome.value = usuario.nome;
                }

                // Preenche o campo 'E-mail'
                if (inputEmail && usuario.email) {
                    inputEmail.value = usuario.email;
                }

                // Preenche o campo 'Usuário' (se existir a chave usuario.usuario, usa ela; senão gera a partir do nome)
                if (inputUser) {
                    if (usuario.usuario) {
                        inputUser.value = usuario.usuario;
                    } else if (usuario.nome) {
                        // Exemplo: "Gustavo de Oliveira" vira "@gustavo"
                        const primeiroNome = usuario.nome.split(" ")[0].toLowerCase(); 
                        inputUser.value = `@${primeiroNome}`;
                    }
                }

                // Preenche o campo 'Senha'
                if (inputSenha && usuario.senha) {
                    inputSenha.value = usuario.senha;
                }

            } catch (erro) {
                console.error("Erro ao converter os dados do localStorage:", erro);
            }
        } else {
            console.warn("Nenhum usuário logado foi encontrado no localStorage.");
        }
    }

    // Executa o carregamento dos dados ao iniciar a página
    carregarDadosUsuario();
});

const lat = -22.0132;
const lng = -47.8969;
const zoom = 13;

// 1. Inicializa Mapa Principal
const mapContainer = document.getElementById('mapa');

const map = L.map('mapa', {zoomControl: false,         // Removes the +/- buttons
            dragging: false,            // Prevents clicking and dragging the map
            touchZoom: false,           // Prevents pinching to zoom on mobile
            doubleClickZoom: false,     // Prevents double-clicking to zoom
            scrollWheelZoom: false,     // Prevents mouse wheel scrolling
            boxZoom: false,             // Prevents shift-drag zooming
            keyboard: false,            // Prevents keyboard arrow navigation
            attributionControl: true
        }).setView([lat, lng], zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 13,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

function posicionarPontoNoMinimapa(latitude, longitude, textoEndereco = null) {
    mapLat = latitude;
    mapLng = longitude;

    if (minimapMarker !== null) {
        minimap.removeLayer(minimapMarker);
    }

    const imagemIconeAtual = iconesPorTipo[topicoSelecionadoTexto] || "../img/yellowWarning.png";
    const iconeMinimapa = criarIconePersonalizado(imagemIconeAtual);

    minimapMarker = L.marker([mapLat, mapLng], {
        icon: iconeMinimapa
    }).addTo(minimap);

    minimap.setView([mapLat, mapLng], 16);

    if (textoEndereco) {
        enderecoSelecionado = textoEndereco;
    }
}

// --- FUNÇÕES DE NAVEGAÇÃO E POPUP ---
function openNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "280px"; 
}

function closeNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "0"; 
}

// --- LÓGICA DE LOGOUT ---
const linkLogout = document.getElementById('logout');

if (linkLogout) {
    linkLogout.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Remove os dados da sessão do usuário
        localStorage.removeItem('usuario');
        
        alert("Sessão encerrada com sucesso!");
        
        // Redireciona para a página inicial/login se necessário
        window.location.assign("index.html")
    });
}

// Inicializa os marcadores
mostrarMarkers();