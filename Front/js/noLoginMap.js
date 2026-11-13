//constantes para marcar localização do mapa
        const lat = -22.0132;
        const lng = -47.8969;
        const zoom = 13;

        //criar mapa
        const map = L.map('mapa').setView([lat, lng], zoom);

        //adicionar o estilo do mapa usando a API do openStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        //exemplo de ponto no mapa
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("<b>Olá!</b><br>Este é o meu ponto marcado.").openPopup();