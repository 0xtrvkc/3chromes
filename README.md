# chrome-layout

Opens 3 browser windows automatically arranged on your screen:

```
┌──────────┬─────────────────┐
│          │    Window 2     │
│ Window 1 │   (top right)   │
│  (left)  ├─────────────────┤
│          │    Window 3     │
│          │ (bottom right)  │
└──────────┴─────────────────┘
```

## Setup

```bash
npm install
npm start
```

## Configuration

Edit the `WINDOWS` array at the top of `main.js` to set the URL for each window:

```js
const WINDOWS = [
  { url: 'https://your-site.com', title: 'Window 1 - Left' },
  { url: 'https://your-site.com', title: 'Window 2 - Top Right' },
  { url: 'https://your-site.com', title: 'Window 3 - Bottom Right' },
]
```

## Layout

- **Window 1** — 35% of screen width, full height, anchored left
- **Window 2** — 65% of screen width, top half, anchored right
- **Window 3** — 65% of screen width, bottom half, anchored right

Sizes are calculated dynamically based on your screen resolution.

## Requirements

- Node.js 18+
- npm
