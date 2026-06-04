const { app, BrowserWindow, screen } = require('electron')

// Configure your URLs here
const WINDOWS = [
  { url: 'https://www.tradingview.com/chart/Ajjc93lG/', title: 'Window 1 - Left' },
  { url: 'https://www.cmegroup.com/tools-information/quikstrike/vol2vol-expected-range.html?fbclid=IwdGRleAO5rDZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEehwgF_Mvzw2I7BzMJY4Ed9gbRNvCRY_sQK1IOubK7iQNStljljWKTL4pMWvI_aem_u1mpeNq-0Q4el6twXACyoA', title: 'Window 2 - Top Right' },
  { url: 'https://www.cmegroup.com/tools-information/quikstrike/vol2vol-expected-range.html?fbclid=IwdGRleAO5rDZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEehwgF_Mvzw2I7BzMJY4Ed9gbRNvCRY_sQK1IOubK7iQNStljljWKTL4pMWvI_aem_u1mpeNq-0Q4el6twXACyoA', title: 'Window 3 - Bottom Right' },
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
