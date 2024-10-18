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
                await handleExtensionPage();
                show("div-extension");
            }
            else
            {
                show("div-na");
            }
        }
    }
}

const handleExtensionPage = async function()
{
    const ul = document.createElement("ul");
    const liSubstack = document.createElement("li");
    liSubstack.appendChild(document.createTextNode(Option.SubstackDomain));
    ul.appendChild(liSubstack);
    const sites = await Option.getSitesAsync();
    sites.forEach(site =>
    {
        const liSite = document.createElement("li");
        liSite.appendChild(document.createTextNode(site));
        ul.appendChild(liSite);
    });
    document.getElementById("div-sites")?.appendChild(ul);
}

const show = function(elementId: string)
{
    document.getElementById(elementId)?.classList.remove("d-none");
}