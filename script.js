document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerenciador de Carregamento de Anúncios
    const loadMoreButtons = document.querySelectorAll('.btn-load-more');

    const loadMoreAds = (sectionType) => {
        const grid = document.querySelector(`#${sectionType} .ad-grid`);
        const isLost = sectionType === 'lost';
        const button = document.querySelector(`.btn-load-more[data-section="${sectionType}"]`);

        // Simulação de Novos Dados (Pet Fictício de Goiânia)
        const newAd = {
            id: isLost ? `L-${Math.floor(Math.random() * 100) + 3}` : `F-${Math.floor(Math.random() * 100) + 2}`,
            type: isLost ? 'perdido' : 'encontrado',
            title: isLost ? '🚨 Pet Desesperado' : '✅ Pet Acolhido',
            pet: isLost ? 'Beagle Macho (Biscoito)' : 'Cocker Spaniel (Fêmea)',
            desc: isLost ? '**Perdido** no Setor Sul. Com mancha marrom na orelha. Muito brincalhão.' : '**Achado** na Av. T-4. Parece ter fugido, está limpo e bem alimentado.',
            img: isLost ? 'https://via.placeholder.com/300x200?text=Beagle+Perdido' : 'https://via.placeholder.com/300x200?text=Cocker+Achado'
        };

        const adCard = document.createElement('article');
        adCard.classList.add('ad-card', newAd.type);
        adCard.setAttribute('data-pet-id', newAd.id);

        adCard.innerHTML = `
            <div class="ad-header">
                <h3>${newAd.title}</h3>
                <span class="status-tag ${isLost ? 'tag-lost' : 'tag-found'}">${isLost ? 'PERDIDO' : 'ENCONTRADO'}</span>
            </div>
            <div class="ad-body">
                <img src="${newAd.img}" alt="Foto do ${newAd.pet}">
                <h4>${newAd.pet}</h4>
                <p>${newAd.desc}</p>
            </div>
            <div class="ad-footer">
                <button class="btn-details">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(adCard);

        // Simulação de limite: Desativar o botão após carregar 5 adicionais
        if (grid.children.length >= 7) {
            button.textContent = 'Fim da lista atual.';
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

    // 2. Funcionalidade dos Botões de Ação Rápida (Login/Cadastro)
    document.querySelector('.user-area').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-action') || event.target.classList.contains('btn-google')) {
            const action = event.target.textContent || "Login com Google";
            console.log(`Ação de Usuário: ${action}`);
            
            // Aqui seria a lógica para abrir um Modal (Janela Pop-up) ou redirecionar
            alert(`Ação: ${action}. Um modal/página de autenticação profissional seria aberto aqui.`);
        }
    });

    // 3. Funcionalidade dos botões de Detalhes dos Anúncios
    document.querySelectorAll('.ad-grid').forEach(grid => {
        grid.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-details')) {
                const adCard = event.target.closest('.ad-card');
                const petId = adCard.getAttribute('data-pet-id');
                const petName = adCard.querySelector('h4, h3').textContent.trim();
                
                alert(`Redirecionando para: /detalhes-pet/${petId}. Você clicou no anúncio de: ${petName}`);
            }
        });
    });
});