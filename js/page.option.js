import Option from "./option.js";
import Util from "./util.js";
window.addEventListener("load", async () => {
    await Util.displayHosts();
});
document.getElementById("img-help")?.addEventListener("click", async () => {
    await Util.openHelpPage();
});
document.getElementById("btn-refresh")?.addEventListener("click", async () => {
    await Util.displayHosts();
});
document.getElementById("btn-clear")?.addEventListener("click", async () => {
    await Option.clearAllHostsAync();
    await Util.displayHosts();
});
