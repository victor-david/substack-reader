import Storage from "./storage.js";
import ContentScript from "./content.js";
import Tab from "./tab.js";
const Updater = {
    updateFromStorageAsync: async function () {
        const current = await Storage.getAsync();
        await Private.updateAsync(current.text, current.file);
    },
    updateIfAsync: async function (text, cssFile) {
        const current = await Storage.getAsync();
        if (current.file != cssFile) {
            await Private.updateAsync(text, cssFile);
        }
    },
};
const Private = {
    updateAsync: async function update(text, cssFile) {
        await chrome.action.setBadgeText({ text: text });
        await ContentScript.updateCssAsync(cssFile)
            .then(async () => {
            await Storage.setStateAsync(text, cssFile);
            await Tab.reloadTabsAsync();
        });
    }
};
export default Updater;
