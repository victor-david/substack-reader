import {Values} from "./storage.js"
import Updater from "./update.js"
import Option from "./option.js";
import Util from "./util.js";
import Tab from "./tab.js";

document.getElementById("btn-light")?.addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextLight, Values.CssLight);
});

document.getElementById("btn-dark")?.addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextDark, Values.CssDark);
});

document.getElementById("btn-off")?.addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextZero, Values.CssZero);
});

document.getElementById("img-option")?.addEventListener("click", async () =>
{
    await chrome.runtime.openOptionsPage();
});

// load
// DOMContentLoaded
window.addEventListener("load", async () =>
{
    const tab = await Tab.getCurrentTabAsync();
    evaluateTab(tab);
});

const evaluateTab = async function(tab: chrome.tabs.Tab): Promise<void>
{
    // All pieces are hidden by default (except the icon and title)
    // Depending on the url, show a piece
    if (tab?.url?.length)
    {
        if (Util.isSchema(tab.url))
        {
            if (Util.isSubstack(tab.url))
            {
                show("div-theme-buttons");
                show("div-substack");
            }
        }
        else
        {
            if (Util.isExtensionPage(tab.url))
            {
                await Util.displaySites();
                show("div-extension");
            }
            else
            {
                show("div-na");
            }
        }
    }
}

const show = function(elementId: string)
{
    document.getElementById(elementId)?.classList.remove("d-none");
}