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

// --- FUNÇÕES DE NAVEGAÇÃO E POPUP ---
function openNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "280px"; 
}

function closeNav() { 
    const sidebar = document.getElementById("openSidebar");
    if (sidebar) sidebar.style.width = "0"; 
}