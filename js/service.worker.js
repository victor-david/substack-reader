// import Values from "./values.js";
import Content from "./content.js";
import Updater from "./update.js";
import Rules from "./rules.js";
import { Values, Storage } from "./storage.js";

console.log("Service worker started");

// Storage.clear().then(()=> Storage.get().then((data)=>console.log(data)));


// Storage.get().then((data) => console.log(data));

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
    // setDeclarativeContentRules();
});

Content.register();

// chrome.scripting.registerContentScripts(
//     [
//         {
//             id:"id-content-scripts",
//             matches:[Values.SiteMask],
//             css:[Values.CssZero]
//         }
//     ]
// )
// .catch((err) => console.warn("Registration", err));

// const setDeclarativeContentRules = () =>
// {
//     chrome.action.disable();

//     chrome.declarativeContent.onPageChanged.removeRules(undefined, () =>
//     {
//         const mainRule =
//         {
//             conditions:
//             [
//                 new chrome.declarativeContent.PageStateMatcher(
//                     {
//                         pageUrl: {hostSuffix: Values.SiteSuffix},
//                     })
//             ],
//             actions: [new chrome.declarativeContent.ShowAction()],
//         };

//         const secRule =
//         {
//             conditions:
//             [
//                 new chrome.declarativeContent.PageStateMatcher(
//                     {
//                         pageUrl: {hostSuffix: ".mexicolisto.com"},
//                     })
//             ],
//             actions: [new chrome.declarativeContent.ShowAction()],
//         };

//         // Finally, apply our new array of rules
//         const rules = [mainRule, secRule];
//         chrome.declarativeContent.onPageChanged.addRules(rules);
//     });
// }