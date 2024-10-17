import {Values} from "../js/storage.js"
import Updater from "../js/update.js"
import Option from "../js/option.js";
import Tab from "../js/tab.js";

document.getElementById("btn-light").addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextLight, Values.CssLight);
});

document.getElementById("btn-dark").addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextDark, Values.CssDark);
});

document.getElementById("btn-off").addEventListener("click", async () =>
{
    await Updater.updateIfAsync(Values.TextZero, Values.CssZero);
});
// load
// DOMContentLoaded
window.addEventListener("load", async () =>
{
    const tab = await Tab.getCurrentTabAsync();
    evaluateTab(tab)
});

const evaluateTab = function(tab)
{
    if (tab.url.startsWith("https://"))
    {
        if (tab.url.includes(Option.SubstackDomain))
        {
            show("div-substack");
        }
    }
    else
    {
        hide("div-theme-buttons");
        show("div-na");
    }
}

const hide = function(element)
{
    document.getElementById(element).classList.add("d-none");
}

const show = function(element)
{
    document.getElementById(element).classList.remove("d-none");
}