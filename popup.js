let darkMq = window.matchMedia('(prefers-color-scheme: dark)');
let darkListener = null;

document.addEventListener('DOMContentLoaded', () => {
  const modifierSelect = document.getElementById('modifier');
  const themeGroup = document.getElementById('themeGroup');

  chrome.storage.local.get('config', (data) => {
    const cfg = data.config || { modifier: 'Alt', theme: 'system' };
    modifierSelect.value = cfg.modifier;
    const radio = document.querySelector(`input[name="theme"][value="${cfg.theme}"]`);
    if (radio) radio.checked = true;
    applyTheme(cfg.theme);
  });

  modifierSelect.addEventListener('change', saveConfig);
  themeGroup.addEventListener('change', saveConfig);

  function saveConfig() {
    const theme = document.querySelector('input[name="theme"]:checked')?.value || 'system';
    const cfg = { modifier: modifierSelect.value, theme };
    chrome.storage.local.set({ config: cfg });
    applyTheme(theme);
  }

  function applyTheme(theme) {
    if (darkListener) {
      darkMq.removeEventListener('change', darkListener);
      darkListener = null;
    }

    if (theme === 'system') {
      document.documentElement.dataset.theme = darkMq.matches ? 'dark' : 'light';
      darkListener = (e) => {
        document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
      };
      darkMq.addEventListener('change', darkListener);
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }
});
