# bookmarklet-copy-node-context

A tool for generating browser-compatible bookmarklets from Node.js applications.

## How it works

This project compiles JavaScript code into bookmarklet format, creating standalone clickable links that execute specific functionality when added to a webpage. It leverages [Vite](https://vitejs.dev) for fast frontend development and [Terser](https://github.com/terser/terser) for efficient code minification.

## Installation

```bash
npm install bookmarklet-copy-node-context
```

## npm Commands

| Command           | Description                                                       |
|-------------------|-------------------------------------------------------------------|
| `npm run dev`     | Starts development mode (compiles and serves the generated index) |
| `npm run build`   | Builds production version (compiles bookmarklet code)             |
| `npm run compile` | Compiles only the bookmarklet generation logic                    |

## Project Structure

- `src/` - Core bookmarklet generation logic
- `public/` - Static assets
- `vite.config.js` - Vite configuration file
- `terser.config.js` - Terser configuration file

[View on GitHub](https://github.com/newmediapilot/bookmarklet-copy-node-context)

## Usage Example

```javascript
// Example: Generate a bookmarklet from a Node.js script
const { generateBookmarklet } = require('bookmarklet-copy-node-context');
const code = 'console.log("Hello, world!");';
const bookmarklet = generateBookmarklet(code);
console.log(bookmarklet);
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[ISC](https://opensource.org/licenses/ISC)