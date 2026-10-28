document.addEventListener("DOMContentLoaded", () => {
    initStarsRating();
    initThumbToggle();
    initFormSubmit();
    initReportButton();
});

// Variavel global do escopo do modulo para armazenar a resposta do Sim/Nao
let respostaGostou = null;

/**
 * 1. Controle dos botoes "Sim / Nao" (Gostou do site)
 */
function initThumbToggle() {
    const thumbButtons = document.querySelectorAll(".btn-thumb");

    thumbButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // Previne qualquer comportamento padrao do botao
            e.preventDefault();

            // Remove a classe 'active' de todos os botoes Sim/Nao
            thumbButtons.forEach((b) => b.classList.remove("active"));

            // Adiciona 'active' no botao que foi clicado
            btn.classList.add("active");

            // Armazena o valor (Sim ou Nao)
            respostaGostou = btn.getAttribute("data-gostou");
            console.log("Opção selecionada:", respostaGostou);
        });
    });
}

/**
 * 2. Controle de interação das Estrelas
 */
function initStarsRating() {
    const starsContainer = document.getElementById("rating-stars");
    const ratingInput = document.getElementById("rating-value");

    if (!starsContainer || !ratingInput) return;

    const stars = starsContainer.querySelectorAll(".star");

    const highlightStars = (count) => {
        stars.forEach((star) => {
            const starValue = Number(star.getAttribute("data-value"));
            if (starValue <= count) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });
    };

    starsContainer.addEventListener("mouseover", (e) => {
        const star = e.target.closest(".star");
        if (star) {
            highlightStars(Number(star.getAttribute("data-value")));
        }
    });

    starsContainer.addEventListener("mouseleave", () => {
        const currentRating = Number(ratingInput.value) || 0;
        highlightStars(currentRating);
    });

    starsContainer.addEventListener("click", (e) => {
        const star = e.target.closest(".star");
        if (star) {
            const selectedValue = star.getAttribute("data-value");
            ratingInput.value = selectedValue;
            highlightStars(Number(selectedValue));
        }
    });
}

/**
 * 3. Envio do formulário de feedback
 */
function initFormSubmit() {
    const btnEnviar = document.getElementById("btn-enviar-feedback");
    const ratingInput = document.getElementById("rating-value");
    const comentarioInput = document.getElementById("comentario");

    if (!btnEnviar) return;

    btnEnviar.addEventListener("click", () => {
        const nota = Number(ratingInput ? ratingInput.value : 0);
        const comentario = comentarioInput ? comentarioInput.value.trim() : "";

        if (nota === 0) {
            alert("Por favor, selecione ao menos uma estrela antes de enviar.");
            return;
        }

        const feedbackPayload = {
            avaliacaoEstrelas: nota,
            gostouDoSite: respostaGostou || "Não informado",
            comentario: comentario,
            dataEnvio: new Date().toISOString()
        };

        console.log("Feedback enviado:", feedbackPayload);
        alert("Obrigado pelo seu feedback! Ele foi enviado com sucesso.");

        // Reset do formulário
        if (ratingInput) ratingInput.value = "0";
        if (comentarioInput) comentarioInput.value = "";
        
        document.querySelectorAll("#rating-stars .star").forEach((s) => s.classList.remove("active"));
        document.querySelectorAll(".btn-thumb").forEach((b) => b.classList.remove("active"));
        respostaGostou = null;
    });
}

/**
 * 4. Botão de nova ocorrência (+)
 */
function initReportButton() {
    const btnReport = document.getElementById("reportIssue");
    if (btnReport) {
        btnReport.addEventListener("click", () => {
            window.location.href = "ocorrencia.html";
        });
    }
}

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