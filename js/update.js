import Storage from "./storage.js";
import ContentScript from "./content.js";

/**
 * Provides an entry point to update content scripts.
 * Used by service worker and popup
 */
const Updater =
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
     * @param {*} text
     * @param {*} cssFile
     */
    updateIfAsync: async function(text, cssFile)
    {
        const current = await Storage.getAsync();
        if (current.file != cssFile)
        {
            await Private.updateAsync(text, cssFile);
        }
    },
}

const Private =
{
    updateAsync: async function update(text, cssFile)
    {
        await chrome.action.setBadgeText({text: text});
        await ContentScript.updateCssAsync(cssFile)
        .then(async () =>
        {
            await Storage.setStateAsync(text, cssFile);
            await this.refreshAffectedTabsAsync();
         });
    },

    refreshAffectedTabsAsync: async function ()
    {
        const tabs = await chrome.tabs.query(
            {
                url: ["https://*.substack.com/*"]
            });

        tabs.forEach(tab => chrome.tabs.reload(tab.id));
    }
}
export default Updater;