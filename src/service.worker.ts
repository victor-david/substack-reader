import ContentScript from "./content.js";
import Updater from "./update.js";
// import Option from "./option.js";

// import Rules from "./rules.js";
// import ContextMenu from "./menu.js";

console.log("Service worker started");

chrome.runtime.onInstalled.addListener(async (e) =>
{
    // await Option.addSiteAsync("mexicolisto.com").then(() => Option.getSitesAsync().then((data) => console.log(data)));
    // await ContextMenu.init();
    await ContentScript.registerAsync();
    // await Rules.setContentRulesAsync();

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
    // await Rules.setContentRulesAsync();
});