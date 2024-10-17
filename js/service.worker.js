import Content from "./content.js";
import Updater from "./update.js";
import Rules from "./rules.js";
import Storage from "./storage.js";
import Option from "./option.js";

console.log("Service worker started");

chrome.runtime.onInstalled.addListener(async (e) =>
{
    // await Storage.clear();
    // await Option.addSite("mexicolisto.com");
    // await Storage.get();
    await Rules.setContentRules();
    console.log(await Option.getSites());

    if (e.reason == "install")
    {
        await Updater.updateFromStorage();
        await chrome.tabs.create({url:"page/help.html"});
    }
    if (e.reason == "update")
    {
        await Updater.updateFromStorage();
    }
});

chrome.runtime.onStartup.addListener(async () =>
{
    await Updater.updateFromStorage();
});

chrome.management.onEnabled.addListener(async ()=>
{
    await Updater.updateFromStorage();
    Rules.setContentRules();
});

Content.register();