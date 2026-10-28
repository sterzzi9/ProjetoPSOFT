const apiUrl = `http://localhost:8080/problemasLongitudeLatitude`;

async function mostrarMarkers() {
    // 1. Extrai o ID do usuário diretamente do localStorage
    const usuarioLocalStorage = localStorage.getItem('usuario');
    let usuarioLogadoId = null;

    if (usuarioLocalStorage) {
        try {
            const usuarioObj = JSON.parse(usuarioLocalStorage);
            usuarioLogadoId = usuarioObj.id;
        } catch (e) {
            console.error("Erro ao converter o usuário do localStorage:", e);
        }
    }

    // Valida se o ID do usuário existe no localStorage
    if (!usuarioLogadoId) {
        console.error("Nenhum usuário logado encontrado no localStorage.");
        return;
    }

    try {
        // Busca todos os marcadores cadastrados
        const resposta = await fetch(apiUrl);
        
        if (!resposta.ok) throw new Error("Erro ao carregar dados do servidor.");

        const dadosMarker = await resposta.json();

        // Limpa a lista antes de renderizar os itens novos
        const lista = document.getElementById('listona');
        if (lista) lista.innerHTML = "";

        // 2. Filtra apenas os marcadores cujo 'usuario.id' corresponde ao ID logado
        const meusProblemas = dadosMarker.filter(markerData => {
            return markerData.usuario && markerData.usuario.id === usuarioLogadoId;
        });

        // 3. Renderiza somente os marcadores filtrados do usuário logado
        meusProblemas.forEach(markerData => {

            const markerConteudo = document.createElement('span');
            const li = document.createElement('li');

            markerConteudo.innerHTML = `Tipo de problema: ${markerData.tipo} <br> Descrição: ${markerData.descricao} <br> Endereço: ${markerData.endereco}`;

            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = 'Excluir';
            btnDeletar.onclick = () => deletarMarkers(markerData.id);
            btnDeletar.style.backgroundColor = 'red';
            btnDeletar.style.marginLeft = '5px';
            btnDeletar.style.marginRight = '5px';
            btnDeletar.style.borderRadius = '5px';

            const linha = document.createElement('hr');
            linha.style.height = '2px';
            linha.style.backgroundColor = 'black';
            linha.style.width = '100%';

            li.appendChild(markerConteudo);
            li.appendChild(btnDeletar);
            li.appendChild(linha);

            lista.appendChild(li);

        });
    } catch (erro) {
        console.error("Erro ao mostrar marcadores:", erro);
    }
}

async function deletarMarkers(id){
    const confirmar = confirm("Deseja excluir essa ocorrência?");
    if (confirmar == true) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        document.getElementById('listona').innerHTML = "";
    }

    mostrarMarkers();
}


const lat = -22.0132;
const lng = -47.8969;
const zoom = 13;

// 1. Inicializa Mapa Principal
const mapContainer = document.getElementById('mapa');

const map = L.map('mapa', {
    zoomControl: false,         // Removes the +/- buttons
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