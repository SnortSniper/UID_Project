const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('indexx.html');
  mainWindow.webContents.openDevTools();

  // Create context menu
  const contextMenu = new Menu();
  contextMenu.append(new MenuItem({
    label: 'Reload',
    click: () => mainWindow.reload()
  }));
  contextMenu.append(new MenuItem({
    label: 'Toggle DevTools',
    click: () => mainWindow.webContents.toggleDevTools()
  }));
  contextMenu.append(new MenuItem({ type: 'separator' }));
  contextMenu.append(new MenuItem({
    label: 'Quit',
    click: () => app.quit()
  }));

  // Show context menu on right-click
  mainWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup({
      window: mainWindow,
      x: params.x,
      y: params.y
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
