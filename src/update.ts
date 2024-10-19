import Storage from "./storage.js";
import ContentScript from "./content.js";
import Tab from "./tab.js";

/**
 * Provides an entry point to update content scripts.
 * Used by service worker and popup
 */
const Updater = Object.freeze(
{
    /**
     * Updates using stored values.
     *
     * This method is called from the service worker to set
     * the status of the extension at startup, installation, and enabled.
     */
    updateFromStorageAsync: async function()
    {
        const current = await Storage.getAsync();
        await Private.updateAsync(current.text, current.file);
    },

    /**
     * Updates if passed cssFile is different from that in storage.
     *
     * This method is called from the button click handlers in popup.js
     * using fixed values for the parms; they won't be empty.
     *
     * @param {string} text
     * @param {string} cssFile
     */
    updateIfAsync: async function(text: string, cssFile: string)
    {
        const current = await Storage.getAsync();
        if (current.file != cssFile)
        {
            await Private.updateAsync(text, cssFile);
        }
    },
});

const Private =
{
    updateAsync: async function update(text: string, cssFile: string)
    {
        await chrome.action.setBadgeText({text: text});
        await ContentScript.updateCssAsync(cssFile)
        .then(async () =>
        {
            await Storage.setStateAsync(text, cssFile);
            await Tab.reloadTabsAsync();
         });
    }
}
export default Updater;