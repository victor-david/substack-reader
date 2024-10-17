import ContentScript from "./content.js";
import Updater from "./update.js";
console.log("Service worker started");
chrome.runtime.onInstalled.addListener(async (e) => {
    await ContentScript.registerAsync();
    if (e.reason == "install") {
        await Updater.updateFromStorageAsync();
        await chrome.tabs.create({ url: "page/help.html" });
    }
    if (e.reason == "update") {
        await Updater.updateFromStorageAsync();
    }
});
chrome.runtime.onStartup.addListener(async () => {
    await ContentScript.registerAsync();
    await Updater.updateFromStorageAsync();
});
chrome.management.onEnabled.addListener(async () => {
    await Updater.updateFromStorageAsync();
});
