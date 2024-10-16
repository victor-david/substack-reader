import Content from "./content.js";
import Updater from "./update.js";
import Rules from "./rules.js";

console.log("Service worker started");

chrome.runtime.onInstalled.addListener(async (e) =>
{
    Rules.setContentRules();

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