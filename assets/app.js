// Cone-Selector - Application Logic

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
  
  themeBtn.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
}



// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Initialize theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateThemeToggleButton();
  }
});
