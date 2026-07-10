# Copy Links from Block

🌐 **English** | [Русский](README.ru.md)

Chrome extension that copies all links from an HTML block via right-click.

## Installation

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `chrome_extenshion_copy_links_from_block` folder

## Usage

There are two ways to copy links:

### 1. Context menu (always works)

1. **Right-click** anywhere inside a block with links
2. Select **"Copy links from block"**
3. URLs are copied to your clipboard

### 2. Modifier key + click (faster)

1. **Hold** the configured modifier key (default: `Alt`)
2. **Hover** over a block — it will be highlighted with a blue outline
3. **Left-click** while holding the key — links are copied immediately

Modifier key and theme can be changed in the extension popup (click the extension icon in the toolbar).

## How it works

The extension captures the right-clicked element, then walks up the DOM tree until it finds a parent container with **2 or more links**. All `href` values from that container are collected and copied to the clipboard.

This approach is not tied to any specific CSS class or selector — it works with any HTML structure.

When the configured modifier key is held, hovering highlights the target block, and clicking copies the links — no context menu needed.

## Project structure

```
├── manifest.json     — Chrome Extension manifest (Manifest V3)
├── background.js     — background service worker (context menu)
├── content.js        — content script (link extraction, highlight, keybind)
├── popup.html        — settings popup UI
├── popup.js          — settings popup logic (theme, modifier key)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
├── README.ru.md
└── LICENSE
```

## License

MIT
