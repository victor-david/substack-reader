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

document.getElementById("btn-add-host")?.addEventListener("click", async () =>
{
    const tab = await Tab.getCurrentTabAsync();
    const tabUrl = Tab.getTabUrl(tab);
    if (tabUrl)
    {
        await Option.addHostAsync(Util.getHostName(tabUrl));
        hide("section-user-add");
        show("div-theme-buttons");
        show("section-user-enabled");
    }
});

document.getElementById("btn-remove-host")?.addEventListener("click", async () =>
{
    const tab = await Tab.getCurrentTabAsync();
    const tabUrl = Tab.getTabUrl(tab);
    if (tabUrl)
    {
        await Option.removeHostAsync(Util.getHostName(tabUrl));
        show("section-user-add");
        hide("div-theme-buttons");
        hide("section-user-enabled");
    }
});

document.getElementById("img-option")?.addEventListener("click", async () =>
{
    await chrome.runtime.openOptionsPage();
});

window.addEventListener("load", async () =>
{
    const tab = await Tab.getCurrentTabAsync();
    evaluateTab(Tab.getTabUrl(tab));
});

const evaluateTab = async function(tabUrl: string): Promise<void>
{
    // All pieces are hidden by default (except the icon and title)
    // Depending on the url, show a piece
    if (tabUrl)
    {
        if (Util.isSchema(tabUrl))
        {
            if (Util.isSubstack(tabUrl))
            {
                show("div-theme-buttons");
                show("div-substack");
            }
            else
            {
                const host = Util.getHostName(tabUrl);
                const haveHost = await Option.haveHost(host);
                if (haveHost)
                {
                    show("div-theme-buttons");
                    show("section-user-enabled");
                }
                else
                {
                    show("section-user-add");
                }
            }
        }
        else
        {
            if (Util.isExtensionPage(tabUrl))
            {
                await Util.displayHosts();
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

const hide = function(elementId: string)
{
    document.getElementById(elementId)?.classList.add("d-none");
}