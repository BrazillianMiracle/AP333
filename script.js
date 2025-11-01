document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerenciamento de Carregamento de Anúncios (Load More)
    const loadMoreButtons = document.querySelectorAll('.btn-load-more');

    const createNewAd = (data) => {
        // Função utilitária para criar um novo elemento de anúncio (simplificado)
        const adCard = document.createElement('article');
        adCard.classList.add('ad-card', 'ad-card-enhanced', data.type);
        adCard.setAttribute('data-pet-id', data.id);

        const statusText = data.type === 'perdido' ? 'Última Vista' : 
                         data.type === 'encontrado' ? 'Achado' : 'Para Adoção';
        const tagClass = data.type === 'perdido' ? 'tag-lost' : 
                         data.type === 'encontrado' ? 'tag-found' : 'tag-adopt';

        adCard.innerHTML = `
            <div class="ad-header">
                <h3>${data.pet}</h3>
                <span class="status-tag ${tagClass}">${statusText}: ${data.location}</span>
            </div>
            <div class="ad-body">
                <img src="${data.img}" alt="Foto do ${data.pet}">
                <p class="ad-description">${data.desc}</p>
            </div>
            <div class="ad-footer">
                <button class="btn-details">${data.type === 'adocao' ? 'Quero Adotar' : 'Ver Detalhes'}</button>
            </div>
        `;
        return adCard;
    };

    const loadMoreAds = (sectionType) => {
        const grid = document.querySelector(`#${sectionType} .ad-grid`);
        const button = document.querySelector(`.btn-load-more[data-section="${sectionType}"]`);

        // Dados fictícios com texto mais criativo
        const newAdData = {
            lost: { id: `L-${grid.children.length + 1}`, type: 'perdido', pet: 'Pinscher Idoso (Pipoca)', location: 'Setor Bueno', desc: '**Urgente:** Precisa de ração especial renal. Está muito fragilizado. **RECOMPENSA DE R$ 800**.', img: 'https://via.placeholder.com/300x200?text=Pinscher+Idoso' },
            found: { id: `F-${grid.children.length + 1}`, type: 'encontrado', pet: 'Gato Persa (Branco)', location: 'Setor Sul', desc: 'Resgatado em telhado. Pelagem longa, bem cuidado. Procuramos o dono que deve ser de apartamento.', img: 'https://via.placeholder.com/300x200?text=Gato+Persa+Resgatado' },
            adocao: { id: `A-${grid.children.length + 1}`, type: 'adocao', pet: 'Cão Jovem (Duque)', location: 'Lar Temporário', desc: 'Porte grande, castrado. Ideal para casa com quintal. Enérgico e protetor. Só para tutores experientes.', img: 'https://via.placeholder.com/300x200?text=Duque+Para+Adocao' }
        };

        const newAdElement = createNewAd(newAdData[sectionType]);
        grid.appendChild(newAdElement);

        // Lógica para desativar o botão após um certo número
        if (grid.children.length >= 5) {
            button.textContent = 'Fim dos anúncios recentes.';
            button.disabled = true;
            button.style.opacity = '0.7';
        }
    };

    loadMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const section = event.target.getAttribute('data-section');
            loadMoreAds(section);
        });
    });

    // 2. Funcionalidade dos Botões de Detalhes dos Anúncios
    document.querySelectorAll('.ad-grid').forEach(grid => {
        grid.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-details')) {
                const adCard = event.target.closest('.ad-card');
                const petId = adCard.getAttribute('data-pet-id');
                const petName = adCard.querySelector('h3').textContent.trim();
                
                alert(`Redirecionando para: /detalhes-pet/${petId}. Você clicou no anúncio de: ${petName}.`);
            }
        });
    });

    // 3. Funcionalidade dos Botões de Adicionar Anúncio (Links Diretos)
    const actionLinks = {
        'link-report-lost': 'Reportar Pet Perdido',
        'link-report-found': 'Publicar Pet Encontrado',
        'link-report-adopt': 'Anunciar Pet para Adoção'
    };

    Object.keys(actionLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Ação: ${actionLinks[id]}. Um formulário modal/página de envio de anúncio seria aberto aqui, solicitando informações detalhadas do pet e fotos.`);
            });
        }
    });

    // 4. Micro-interação: Hover nos botões da Hero Section (simulação em JS)
    document.querySelectorAll('.btn-cta').forEach(button => {
        button.addEventListener('mouseover', () => {
            // Em CSS puro é mais eficiente, mas deixamos aqui como exemplo de JS para micro-interação
            button.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
        });
        button.addEventListener('mouseout', () => {
            button.style.textShadow = 'none';
        });
    });
});