import ContentScript from "./content.js";
import Updater from "./update.js";
import Rules from "./rules.js";
import Storage from "./storage.js"
import Option from "./option.js";

console.log("Service worker started");
// Storage.getAsync().then((data) => console.log("Service Worker:", data));
// Option.getSitesAsync().then((sites) => console.log("Service worker", sites));

// const sites = Option.getSites();
// console.log("Service Worker (sync sites)", sites);
// console.log("Service Worker (sync all)", Storage.get());

chrome.runtime.onInstalled.addListener(async (e) =>
{
    await ContentScript.registerAsync();
    await Rules.setContentRulesAsync();

    if (e.reason == "install")
    {
        await Updater.updateFromStorageAsync();
        await chrome.tabs.create({url:"page/help.html"});
    }
    if (e.reason == "update")
    {
        await Updater.updateFromStorageAsync();
    }
});

chrome.runtime.onStartup.addListener(async () =>
{
    await ContentScript.registerAsync();
    await Updater.updateFromStorageAsync();
});

chrome.management.onEnabled.addListener(async ()=>
{
    await Updater.updateFromStorageAsync();
    await Rules.setContentRulesAsync();
});

// ContentScript.registerAsync();