/**
 * Handles the extension options page
 */
import Option from "./option.js";
import Util from "./util.js";

window.addEventListener("load", async () =>
{
    await Util.displaySites();
});

document.getElementById("btn-clear")?.addEventListener("click", async () =>
{
    await Option.clearAllSitesAync();
    await Util.displaySites();
});