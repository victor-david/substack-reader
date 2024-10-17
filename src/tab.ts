/**
 * This module handles tab operations
 */
const Tab =
{
    getCurrentTabAsync: async function(): Promise<chrome.tabs.Tab>
    {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    },

    reloadTabsAsync: async function (): Promise<void>
    {
        // TODO: check storage
        const tabs = await chrome.tabs.query(
            {
                url: ["https://*.substack.com/*"]
            });

        tabs.forEach(tab =>
        {
            chrome.tabs.reload(tab.id as number)
        });
    }
};
export default Tab;