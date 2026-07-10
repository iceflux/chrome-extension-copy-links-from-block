let clickedElement = null;

document.addEventListener('contextmenu', (e) => {
  clickedElement = e.target;
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== 'copyLinks') return;
  copyLinksFromBlock();
});

function findContainer(el) {
  let current = el;
  while (current && current !== document.body && current !== document.documentElement) {
    const links = current.querySelectorAll('a[href]');
    if (links.length >= 2) return { container: current, links };
    current = current.parentElement;
  }
  const bodyLinks = document.body.querySelectorAll('a[href]');
  if (bodyLinks.length >= 2) return { container: document.body, links: bodyLinks };
  return { container: el, links: el.querySelectorAll('a[href]') };
}

function copyLinksFromBlock() {
  const el = clickedElement;
  if (!el) {
    showToast('Ошибка: не удалось определить элемент');
    return;
  }

  const { container, links } = findContainer(el);

  if (links.length === 0) {
    showToast('Ссылки не найдены');
    return;
  }

  const urls = Array.from(links).map(a => a.href);
  navigator.clipboard.writeText(urls.join('\n')).then(() => {
    showToast(`Скопировано ${urls.length} ссылок`);
  }).catch(() => {
    showToast('Ошибка копирования в буфер обмена');
  });
}

function showToast(text) {
  const existing = document.getElementById('clb-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'clb-toast';
  toast.textContent = text;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: '#323232',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    zIndex: '2147483647',
    font: '14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    opacity: '0',
    transition: 'opacity 0.2s ease'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, 2200);
}
