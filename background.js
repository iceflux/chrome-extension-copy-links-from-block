chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copyLinksFromBlock',
    title: chrome.i18n.getMessage('contextMenuTitle'),
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'copyLinksFromBlock') return;
  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { action: 'copyLinks' });
});
