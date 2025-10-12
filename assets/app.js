// MS-39 Viewer - Application Logic

// Chart data configuration
const CHARTS_DATA = [
  {
    id: 'nipple+anillo',
    filename: 'nipple+anillo.html',
    title: 'Fila 0',
    rowIndex: 0,
    class: 'anillos',
    type: 'quad'
  },
  {
    id: 'Croissant_4',
    filename: 'Croissant_4.html',
    title: 'Fila 1',
    rowIndex: 1,
    class: 'croissant',
    type: 'quad'
  },
  {
    id: 'DUCK_4',
    filename: 'DUCK_4.html',
    title: 'Fila 2',
    rowIndex: 2,
    class: 'duck',
    type: 'quad'
  },
  {
    id: 'NIPPLE_4',
    filename: 'NIPPLE_4.html',
    title: 'Fila 3',
    rowIndex: 3,
    class: 'nipple',
    type: 'quad'
  },
  {
    id: 'SNOWMAN_4',
    filename: 'SNOWMAN_4.html',
    title: 'Fila 4',
    rowIndex: 4,
    class: 'snowman',
    type: 'quad'
  }
];

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  updateThemeToggleButton();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggleButton();
}

function updateThemeToggleButton() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark' || 
    (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  themeBtn.innerHTML = isDark 
    ? '<span aria-hidden="true">☀️</span> Modo Claro' 
    : '<span aria-hidden="true">🌙</span> Modo Oscuro';
}

// Gallery Rendering
function renderGallery(filters = {}) {
  const container = document.getElementById('gallery-container');
  if (!container) return;
  
  let filteredCharts = [...CHARTS_DATA];
  
  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredCharts = filteredCharts.filter(chart => 
      chart.title.toLowerCase().includes(searchLower) ||
      chart.class.toLowerCase().includes(searchLower) ||
      chart.id.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply type filter
  if (filters.type && filters.type !== 'all') {
    filteredCharts = filteredCharts.filter(chart => chart.type === filters.type);
  }
  
  // Apply row index filter
  if (filters.rowIndex !== undefined && filters.rowIndex !== '' && filters.rowIndex !== 'all') {
    const rowIdx = parseInt(filters.rowIndex, 10);
    filteredCharts = filteredCharts.filter(chart => chart.rowIndex === rowIdx);
  }
  
  // Render cards or empty state
  if (filteredCharts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">📊</div>
        <p>No se encontraron gráficos con los filtros aplicados.</p>
      </div>
    `;
    return;
  }
  
  const cardsHTML = filteredCharts.map(chart => createCardHTML(chart)).join('');
  container.innerHTML = `<div class="card-grid">${cardsHTML}</div>`;
}

function createCardHTML(chart) {
  return `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${chart.title}</h3>
        <span class="card-badge badge-${chart.class}">${chart.class}</span>
      </div>
      <div class="card-meta">
        <div>Índice de fila: ${chart.rowIndex}</div>
        <div>Tipo: ${chart.type}</div>
      </div>
      <div class="card-actions">
        <a href="reports/figs_html/${chart.filename}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">👁️</span> Ver Gráfico
        </a>
      </div>
    </div>
  `;
}

// Filter Management
function initFilters() {
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');
  const rowFilter = document.getElementById('row-filter');
  
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  
  if (typeFilter) {
    typeFilter.addEventListener('change', applyFilters);
  }
  
  if (rowFilter) {
    rowFilter.addEventListener('change', applyFilters);
  }
  
  // Populate row filter options
  if (rowFilter) {
    const uniqueRows = [...new Set(CHARTS_DATA.map(c => c.rowIndex))].sort((a, b) => a - b);
    uniqueRows.forEach(row => {
      const option = document.createElement('option');
      option.value = row;
      option.textContent = `Fila ${row}`;
      rowFilter.appendChild(option);
    });
  }
}

function applyFilters() {
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');
  const rowFilter = document.getElementById('row-filter');
  
  const filters = {
    search: searchInput ? searchInput.value.trim() : '',
    type: typeFilter ? typeFilter.value : 'all',
    rowIndex: rowFilter ? rowFilter.value : 'all'
  };
  
  renderGallery(filters);
}

// Viewer Logic
function initViewer() {
  const urlParams = new URLSearchParams(window.location.search);
  const chartId = urlParams.get('id');
  
  if (!chartId) {
    showError('No se especificó un gráfico para visualizar.');
    return;
  }
  
  const chart = CHARTS_DATA.find(c => c.id === chartId);
  
  if (!chart) {
    showError(`No se encontró el gráfico con ID: ${chartId}`);
    return;
  }
  
  renderViewer(chart);
}

function renderViewer(chart) {
  // Update page title
  document.title = `${chart.title} - MS-39 Viewer`;
  
  // Update metadata
  const metaTitle = document.getElementById('viewer-title');
  const metaRow = document.getElementById('viewer-row');
  const metaClass = document.getElementById('viewer-class');
  const metaType = document.getElementById('viewer-type');
  
  if (metaTitle) metaTitle.textContent = chart.title;
  if (metaRow) metaRow.textContent = chart.rowIndex;
  if (metaClass) {
    metaClass.textContent = chart.class;
    metaClass.className = `viewer-meta-value card-badge badge-${chart.class}`;
  }
  if (metaType) metaType.textContent = chart.type;
  
  // Set iframe source
  const iframe = document.getElementById('plot-iframe');
  if (iframe) {
    iframe.src = `reports/figs_html/${chart.filename}`;
    iframe.title = `Visualización ${chart.title} - ${chart.class}`;
  }
  
  // Setup action buttons
  setupViewerActions(chart);
}

function setupViewerActions(chart) {
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const openTabBtn = document.getElementById('open-tab-btn');
  
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span aria-hidden="true">✓</span> ¡Copiado!';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el enlace');
      });
    });
  }
  
  if (openTabBtn) {
    openTabBtn.addEventListener('click', () => {
      window.open(`reports/figs_html/${chart.filename}`, '_blank');
    });
  }
}

function showError(message) {
  const container = document.querySelector('.viewer-main');
  if (container) {
    container.innerHTML = `
      <div class="error-message" role="alert">
        <strong>Error:</strong> ${message}
      </div>
      <div class="text-center mt-3">
        <a href="studies.html" class="btn btn-primary">Volver a Estudios</a>
      </div>
    `;
  }
}

// Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNavLink();
  
  // Initialize theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Page-specific initialization
  const galleryContainer = document.getElementById('gallery-container');
  if (galleryContainer) {
    initFilters();
    renderGallery();
  }
  
  const viewerContainer = document.querySelector('.viewer-container');
  if (viewerContainer) {
    initViewer();
  }
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateThemeToggleButton();
  }
});
