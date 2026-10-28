// --- Dicionário com os caminhos dos ícones ---
const iconesPorTipo = {
    "Buraco pequeno": "img/Hole.png",
    "Buraco médio": "img/Hole.png",
    "Buraco grande": "img/Hole.png",
    "Enchente": "img/Flood.png",
    "Entulho / Deslizamento": "img/Landslide.png",
    "Incêndio": "img/Fire.png",
    "Vazamento de esgoto": "img/Sewage.png",
    "Vazamento de água": "img/Leakage.png",
    "Mato alto": "img/Grass.png",
    "Outro...": "img/yellowWarning.png"
};

// --- Função para gerar L.icon com segurança ---
function criarIconePersonalizado(caminhoImagem) {
    return L.icon({
        iconUrl: caminhoImagem || "img/yellowWarning.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        className: 'custom-marker-icon'
    });
}

// --- GEOCODIFICAÇÃO REVERSA (LAT/LNG -> ENDEREÇO) ---
async function obterEndereco(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'HelpSancaApp/1.0'
            }
        });
        
        if (!response.ok) throw new Error('Erro na requisição da API de mapa');
        
        const data = await response.json();
        return data.display_name || "Endereço não identificado";
    } catch (error) {
        console.error("Erro ao converter coordenadas em endereço:", error);
        return "Endereço não disponível";
    }
}

// --- GEOCODIFICAÇÃO DIRETA (ENDEREÇO -> LAT/LNG) ---
async function buscarCoordenadasPorEndereco(textoEndereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(textoEndereco)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'HelpSancaApp/1.0'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar o endereço');

        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                enderecoFormatado: data[0].display_name
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro na busca por endereço:", error);
        return null;
    }
}

// --- LÓGICA DO SELECT CUSTOMIZADO ---
let topicoSelecionadoTexto = "Buraco pequeno";

const selectTrigger = document.getElementById('selectTrigger');
const selectContainer = document.querySelector('.custom-select-container');
const customOptions = document.querySelectorAll('.custom-option');

if (selectTrigger) {
    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectContainer.classList.toggle('open');
    });
}

customOptions.forEach(option => {
    option.addEventListener('click', () => {
        customOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        const texto = option.getAttribute('data-text');
        const iconSrc = option.getAttribute('data-icon');

        if (selectTrigger.querySelector('.selected-option')) {
            selectTrigger.querySelector('.selected-option').innerHTML = `
                <img src="${iconSrc}" alt="${texto}" class="option-icon">
                <span>${texto}</span>
            `;
        }

        topicoSelecionadoTexto = texto;

        if (minimapMarker && minimap) {
            const imagemIconeAtual = iconesPorTipo[topicoSelecionadoTexto] || "img/yellowWarning.png";
            minimapMarker.setIcon(criarIconePersonalizado(imagemIconeAtual));
        }

        selectContainer.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (selectContainer && !selectContainer.contains(e.target)) {
        selectContainer.classList.remove('open');
    }
});

// --- FUNÇÕES DE NAVEGAÇÃO E POPUP ---
function openNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "280px"; 
}

function closeNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "0"; 
}

function openReport() {
    const reportModal = document.getElementById("openReport");
    if (reportModal) {
        reportModal.style.display = "block";
        reportModal.classList.add("active");

        setTimeout(() => {
            if (typeof minimap !== 'undefined' && minimap) {
                minimap.invalidateSize();
            }
        }, 200);
    }
}

function closeReport() {
    const reportModal = document.getElementById("openReport");
    if (reportModal) {
        reportModal.classList.remove("active");
        reportModal.style.display = "none";
    }
}

// --- CONFIGURAÇÃO DOS MAPAS (LEAFLET) ---
const baseUrl = 'http://localhost:8080/problemasLongitudeLatitude'; 
let mapLat = null;
let mapLng = null;
let enderecoSelecionado = null; 
let listaMarcadoresMapa = [];

const lat = -22.0132;
const lng = -47.8969;
const zoom = 13;

// 1. Inicializa Mapa Principal
const mapContainer = document.getElementById('mapa');
let map = null;

if (mapContainer) {
    map = L.map('mapa').setView([lat, lng], zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 13,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
}

// 2. Inicializa Minimapa do PopUp
const minimapContainer = document.getElementById('minimap');
let minimap = null;
let minimapMarker = null;

function posicionarPontoNoMinimapa(latitude, longitude, textoEndereco = null) {
    mapLat = latitude;
    mapLng = longitude;

    if (minimapMarker !== null) {
        minimap.removeLayer(minimapMarker);
    }

    const imagemIconeAtual = iconesPorTipo[topicoSelecionadoTexto] || "img/yellowWarning.png";
    const iconeMinimapa = criarIconePersonalizado(imagemIconeAtual);

    minimapMarker = L.marker([mapLat, mapLng], {
        icon: iconeMinimapa
    }).addTo(minimap);

    minimap.setView([mapLat, mapLng], 16);

    if (textoEndereco) {
        enderecoSelecionado = textoEndereco;
    }
}

if (minimapContainer) {
    minimap = L.map('minimap').setView([lat, lng], zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 13,
        attribution: '&copy; OpenStreetMap'
    }).addTo(minimap);

    minimap.on('click', async (event) => {
        posicionarPontoNoMinimapa(event.latlng.lat, event.latlng.lng);

        enderecoSelecionado = await obterEndereco(mapLat, mapLng);
        const inputEndereco = document.getElementById('inputEndereco');
        if (inputEndereco) {
            inputEndereco.value = enderecoSelecionado;
        }
    });
}

// --- BOTÃO DE BUSCAR ENDEREÇO POR TEXTO ---
const btnBuscarEndereco = document.getElementById('btnBuscarEndereco');
const inputEndereco = document.getElementById('inputEndereco');

if (btnBuscarEndereco) {
    btnBuscarEndereco.addEventListener('click', async () => {
        const textoDigitado = inputEndereco?.value.trim();

        if (!textoDigitado) {
            alert("Digite um endereço para buscar!");
            return;
        }

        btnBuscarEndereco.innerText = "Buscando...";
        btnBuscarEndereco.disabled = true;

        const resultado = await buscarCoordenadasPorEndereco(textoDigitado);

        btnBuscarEndereco.innerText = "Buscar";
        btnBuscarEndereco.disabled = false;

        if (resultado) {
            posicionarPontoNoMinimapa(resultado.lat, resultado.lng, resultado.enderecoFormatado);
            inputEndereco.value = resultado.enderecoFormatado;
        } else {
            alert("Endereço não encontrado. Tente digitar o nome da cidade junto (Ex: Rua X, São Carlos).");
        }
    });
}

// --- EXIBIÇÃO DE MARCADORES SALVOS ---
async function mostrarMarkers() {
    if (!map) return;

    try {
        const resposta = await fetch(baseUrl);
        if (!resposta.ok) throw new Error("Erro ao carregar dados do servidor.");

        const dadosMapa = await resposta.json();

        listaMarcadoresMapa.forEach(m => map.removeLayer(m));
        listaMarcadoresMapa = [];

        dadosMapa.forEach(markerData => {
            const tipo = markerData.tipo || "Outro...";
            const descricao = markerData.descricao || "Sem descrição";
            const enderecoExibicao = markerData.endereco || "Endereço não registrado";
            const dataHoraFormatada = markerData.dataHora 
                ? new Date(markerData.dataHora).toLocaleString('pt-BR') 
                : "Data não registrada";

            const imagemIcone = iconesPorTipo[tipo] || "img/yellowWarning.png";
            const iconePersonalizado = criarIconePersonalizado(imagemIcone);

            const popupConteudo = `
                <div style="font-family: Arial, sans-serif; min-width: 180px;">
                    <h4 style="margin: 0 0 5px 0; color: #0c6168; text-transform: capitalize;">${tipo}</h4>
                    <p style="margin: 0 0 5px 0;"><b>Descrição:</b> ${descricao}</p>
                    <p style="margin: 0 0 5px 0; font-size: 0.9em; color: #333;"><b>📍 Endereço:</b> ${enderecoExibicao}</p>
                    <p style="margin: 5px 0 0 0; font-size: 0.8em; color: #777;"><b>Horário:</b> ${dataHoraFormatada}</p>
                </div>
            `;

            const m = L.marker([markerData.latitude, markerData.longitude], { 
                icon: iconePersonalizado 
            }).addTo(map);

            m.bindPopup(popupConteudo);
            listaMarcadoresMapa.push(m);
        });
    } catch (erro) {
        console.error("Erro ao mostrar marcadores:", erro);
    }
}

// --- SALVAR PROBLEMA NO BANCO DE DADOS (POST ASSOCIADO AO USUÁRIO) ---
async function criarProblema(dadosProblemas, usuarioId) {
    const resposta = await fetch(`${baseUrl}/usuario/${usuarioId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosProblemas)
    });

    if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
    }

    return await resposta.json();
}

// --- SUBMIT DO FORMULÁRIO ---
const formReport = document.getElementById('reportProblemForm');
if (formReport) {
    formReport.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Obtém o ID a partir do objeto 'usuario' no localStorage
        const usuarioLocalStorage = localStorage.getItem('usuario');
        let usuarioId = null;

        if (usuarioLocalStorage) {
            try {
                const usuarioObj = JSON.parse(usuarioLocalStorage);
                usuarioId = usuarioObj.id;
            } catch (err) {
                console.error("Erro ao ler objeto de usuário no localStorage:", err);
            }
        }

        if (!usuarioId) {
            alert("Você precisa estar logado para reportar um problema!");
            return;
        }

        if (!mapLat || !mapLng) {
            alert("Busque um endereço ou clique no minimapa para selecionar a localização!");
            return;
        }

        const enderecoDigitado = inputEndereco?.value.trim();
        const enderecoFinal = enderecoDigitado || enderecoSelecionado || "Endereço não informado";

        const descricaoTexto = document.getElementById('desc')?.value || '';

        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const dia = String(agora.getDate()).padStart(2, '0');
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');
        const dataHoraLocal = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

        const dadosProblemas = {
            latitude: mapLat,
            longitude: mapLng,
            endereco: enderecoFinal,
            tipo: topicoSelecionadoTexto,
            descricao: descricaoTexto,
            dataHora: dataHoraLocal
        };

        try {
            const problemaSalvo = await criarProblema(dadosProblemas, usuarioId);
            localStorage.setItem('ultimoProblemaCriado', JSON.stringify(problemaSalvo));

            formReport.reset();
            if (minimapMarker !== null && minimap) {
                minimap.removeLayer(minimapMarker);
                minimapMarker = null;
            }
            mapLat = null;
            mapLng = null;
            enderecoSelecionado = null;

            closeReport();
            mostrarMarkers();
            alert("Problema registrado e salvo com sucesso!");

        } catch (erro) {
            console.error("Erro na operação:", erro);
            alert("Ops! Ocorreu um erro ao salvar no banco de dados. Verifique a conexão com o servidor ou se o usuário existe no banco.");
        }
    });
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