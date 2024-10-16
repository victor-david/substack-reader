import {Values} from "../js/storage.js"
import Updater from "../js/update.js"

document.getElementById("btn-light").addEventListener("click", async () =>
{
    await Updater.updateIf(Values.TextLight, Values.CssLight);
});

document.getElementById("btn-dark").addEventListener("click", async () =>
{
    await Updater.updateIf(Values.TextDark, Values.CssDark);
});

document.getElementById("btn-off").addEventListener("click", async () =>
{
    await Updater.updateIf(Values.TextZero, Values.CssZero);
});