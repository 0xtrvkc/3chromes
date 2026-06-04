const { app, BrowserWindow, screen } = require('electron')

// Configure your URLs here
const WINDOWS = [
  { url: 'https://google.com', title: 'Window 1 - Left' },
  { url: 'https://google.com', title: 'Window 2 - Top Right' },
  { url: 'https://google.com', title: 'Window 3 - Bottom Right' },
]

function createWindows() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const leftWidth = Math.floor(width * 0.35)
  const rightWidth = width - leftWidth
  const rightHeight = Math.floor(height / 2)

  const layouts = [
    // Window 1: full height on the left
    { x: 0, y: 0, width: leftWidth, height: height },
    // Window 2: top-right
    { x: leftWidth, y: 0, width: rightWidth, height: rightHeight },
    // Window 3: bottom-right
    { x: leftWidth, y: rightHeight, width: rightWidth, height: height - rightHeight },
  ]

  WINDOWS.forEach((config, i) => {
    const win = new BrowserWindow({
      ...layouts[i],
      title: config.title,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    win.loadURL(config.url)
    win.setMenuBarVisibility(false)
  })
}

app.whenReady().then(() => {
  createWindows()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindows()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
