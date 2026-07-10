# Copy Links from Block

🌐 **English** | [Русский](README.ru.md)

Chrome extension that copies all links from an HTML block via right-click.

## Installation

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `chrome_extenshion_copy_links_from_block` folder

## Usage

1. Hover over any block with links on a page
2. **Right-click** anywhere inside the block
3. Select **«Копировать ссылки из блока»**
4. URLs are copied to your clipboard — a toast notification will appear

Copied URLs are separated by newlines. Paste them into a text editor, terminal, or anywhere else.

## How it works

The extension captures the right-clicked element, then walks up the DOM tree until it finds a parent container with **2 or more links**. All `href` values from that container are collected and copied to the clipboard.

This approach is not tied to any specific CSS class or selector — it works with any HTML structure.

## Project structure

```
├── manifest.json     — Chrome Extension manifest (Manifest V3)
├── background.js     — background service worker (context menu)
├── content.js        — content script (link extraction logic)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
├── README.ru.md
├── README.en.md
└── LICENSE
```

## License

MIT
