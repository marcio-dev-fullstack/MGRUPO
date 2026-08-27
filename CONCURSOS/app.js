// app.js - Lógica da aplicação

let currentSection = 'nacional';
let currentFilter = 'todos';
let currentEstado = null;
let currentMunicipio = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFilters();
    initEstadosNav();
    renderConcursos();
    updateStats();
});

// Navegação Principal
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const section = link.dataset.section;
            currentSection = section;
            currentEstado = null;
            currentMunicipio = null;
            
            // Mostra/esconde navegação de estados
            const estadosNav = document.getElementById('estadosNav');
            if (section === 'estados') {
                estadosNav.style.display = 'block';
            } else {
                estadosNav.style.display = 'none';
            }
            
            // Atualiza título
            updateTitle(section);
            
            // Renderiza concursos
            renderConcursos();
            updateStats();
        });
    });
}

// Navegação de Estados
function initEstadosNav() {
    const estadoLinks = document.querySelectorAll('.sub-nav a');
    
    estadoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            estadoLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            currentEstado = link.dataset.estado;
            renderConcursos();
            updateStats();
        });
    });
}

// Filtros
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            renderConcursos();
        });
    });
}

// Atualiza título da página
function updateTitle(section) {
    const title = document.getElementById('pageTitle');
    const titles = {
        'nacional': 'Concursos Nacionais',
        'estados': currentEstado ? `Concursos ${currentEstado}` : 'Concursos por Estado',
        'municipios': 'Concursos Municipais'
    };
    title.textContent = titles[section] || 'Concursos';
}

// Obtém concursos filtrados
function getConcursos() {
    let concursos = [];
    
    if (currentSection === 'nacional') {
        concursos = concursosData.nacional || [];
    } else if (currentSection === 'estados' && currentEstado) {
        concursos = concursosData.estados[currentEstado] || [];
    } else if (currentSection === 'estados') {
        // Mostra todos os estados
        Object.values(concursosData.estados).forEach(estado => {
            concursos = concursos.concat(estado);
        });
    } else if (currentSection === 'municipios') {
        Object.values(concursosData.municipios).forEach(mun => {
            concursos = concursos.concat(mun);
        });
    }
    
    // Aplica filtro de status
    if (currentFilter !== 'todos') {
        concursos = concursos.filter(c => c.status === currentFilter);
    }
    
    return concursos;
}

// Renderiza cards de concursos
function renderConcursos() {
    const container = document.getElementById('concursosList');
    const concursos = getConcursos();
    
    if (concursos.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 60px 20px; grid-column: 1/-1;">
                <h3>Nenhum concurso encontrado</h3>
                <p>Não há concursos ${currentFilter !== 'todos' ? 'com este status' : ''} no momento.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = concursos.map(concurso => createConcursoCard(concurso)).join('');
}

// Cria HTML do card
function createConcursoCard(concurso) {
    const statusClass = `status-${concurso.status.replace('s', '')}`;
    const statusText = {
        'abertos': 'Aberto',
        'previstos': 'Previsto',
        'encerrados': 'Encerrado'
    }[concurso.status];
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };
    
    return `
        <article class="concurso-card">
            <div class="card-header">
                <div class="orgao-badge">
                    <div class="orgao-logo">${concurso.sigla}</div>
                    <div class="orgao-info">
                        <h3>${concurso.orgao}</h3>
                        <span>${concurso.nivel}</span>
                    </div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="card-body">
                <h4>${concurso.cargo}</h4>
                <div class="card-details">
                    <div class="detail-item">
                        <span class="detail-icon">👥</span>
                        <span>${concurso.vagas} vagas</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">💰</span>
                        <span>${concurso.salario}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">📅</span>
                        <span>Inscrições: ${formatDate(concurso.inscricaoInicio)} a ${formatDate(concurso.inscricaoFim)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">📝</span>
                        <span>Prova: ${formatDate(concurso.provaData)}</span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <a href="${concurso.linkEdital}" class="btn btn-secondary" target="_blank">Edital</a>
                <a href="${concurso.linkInscricao}" class="btn btn-primary" target="_blank">Inscrever-se</a>
            </div>
        </article>
    `;
}

// Atualiza estatísticas
function updateStats() {
    const concursos = getConcursos();
    
    const abertos = concursos.filter(c => c.status === 'abertos').length;
    const previstos = concursos.filter(c => c.status === 'previstos').length;
    const encerrados = concursos.filter(c => c.status === 'encerrados').length;
    
    document.getElementById('totalAbertos').textContent = abertos;
    document.getElementById('totalPrevistos').textContent = previstos;
    document.getElementById('totalEncerrados').textContent = encerrados;
}

// Busca
function searchConcursos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('concursosList');
    
    if (!termo) {
        renderConcursos();
        return;
    }
    
    const todosConcursos = [
        ...concursosData.nacional,
        ...Object.values(concursosData.estados).flat(),
        ...Object.values(concursosData.municipios).flat()
    ];
    
    const resultados = todosConcursos.filter(c => 
        c.orgao.toLowerCase().includes(termo) ||
        c.cargo.toLowerCase().includes(termo) ||
        c.sigla.toLowerCase().includes(termo)
    );
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 60px 20px; grid-column: 1/-1;">
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente buscar por órgão, cargo ou sigla.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resultados.map(concurso => createConcursoCard(concurso)).join('');
}

// Enter na busca
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchConcursos();
    }
});