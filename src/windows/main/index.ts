import {
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  Tray,
} from "electron";
import PreferencesStore from "@utils/preferencesStore";

class MainWindow {
  private browserWindow: BrowserWindow;
  private tray: Tray;

  constructor(tray: Tray) {
    this.tray = tray;
  }

  init(): void {
    // Create the browser window.
    this.browserWindow = new BrowserWindow({
      width: 250,
      height: 150,
      show: false,
      frame: false,
      resizable: false,
      fullscreenable: false,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        nodeIntegrationInWorker: true,
      },
    });

    // and load the index.html of the app.
    this.browserWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    this.browserWindow.webContents.openDevTools({ mode: "detach" });

    this.tray.setIgnoreDoubleClickEvents(true);
    this.tray.on("click", this.toggleWindow);
    this.tray.on("right-click", this.rightClickMenu);

    PreferencesStore.set("test", "world");
    // console.log(PreferencesStore.get("test", "defaultValue"));
  }

  getWindowPosition = (): { x: number; y: number } => {
    const windowBounds = this.browserWindow.getBounds();
    const trayBounds = this.tray.getBounds();
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    const y = Math.round(trayBounds.y + trayBounds.height);
    return { x, y };
  };

  toggleWindow = (): void => {
    if (!this.browserWindow.isVisible()) {
      const position = this.getWindowPosition();
      this.browserWindow.setPosition(position.x, position.y, false);
      this.browserWindow.show();
      this.browserWindow.setAlwaysOnTop(true);
      this.browserWindow.setVisibleOnAllWorkspaces(true);
    } else {
      this.browserWindow.hide();
    }
  };

  rightClickMenu = (): void => {
    const menu: Partial<MenuItemConstructorOptions>[] = [
      {
        role: "quit",
        accelerator: "Command+Q",
      },
    ];
    this.tray.popUpContextMenu(Menu.buildFromTemplate(menu));
  };
}

export default MainWindow;
