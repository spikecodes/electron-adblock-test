const { app, BrowserWindow } = require("electron");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
  });

  mainWindow.loadURL("https://reddit.com");

  mainWindow.webContents.openDevTools();

  ElectronBlocker.fromPrebuiltAdsOnly(fetch).then((blocker) => {
    blocker.enableBlockingInSession(mainWindow.webContents.session);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
