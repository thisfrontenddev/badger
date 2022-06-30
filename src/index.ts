import { app, BrowserWindow, Menu, Tray } from "electron";
import MainWindow from "./windows/main";
import { getContextMenu } from "./tray";
import { initTimers, TimerType } from "./utils/timers";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let tray: Tray;
let timers: NodeJS.Timer[];

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  const contextMenu = getContextMenu(app);
  tray = new Tray("src/assets/IconTemplate@2x.png");
  tray.setToolTip("Badger");
  tray.setContextMenu(contextMenu);

  /**
   * TODO: Change the parameter here as a Map, we don't want
   * multiple timers for the same timer type, having the nodejs
   * timers always in the same order will be useful for debugging
   * and tracing.
   */
  timers = initTimers([
    { name: TimerType.EYES, duration: 10000 },
    { name: TimerType.LEGS, duration: 5000 },
  ]);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    // If no window is present, do something
  }
});

app.on("quit", () => {
  for (const timer of timers) {
    clearInterval(timer);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
