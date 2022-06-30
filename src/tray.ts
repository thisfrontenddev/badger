import { App, Menu } from "electron";

export const getContextMenu = (appInstance: App) => Menu.buildFromTemplate([
  { label: "Quit", type: "normal", click: () => appInstance.quit() }
]);
