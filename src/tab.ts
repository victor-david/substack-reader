/**
 * This module handles tab operations
 */
import Option from "./option.js";

const Tab = Object.freeze(
{
    /**
     * Gets the currently active tab
     *
     * @returns Promise<chrome.tabs.Tab>
     */
    getCurrentTabAsync: async function(): Promise<chrome.tabs.Tab>
    {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    },

    /**
     * Reloads all qualified tabs, tabs that host content from the substack domain (default)
     * and all other sites that have been specified by the user.
     */
    reloadTabsAsync: async function (): Promise<void>
    {
        const urls = [Option.getSiteQueryMask()];
        const sites = await Option.getSitesAsync();

        sites.forEach(site =>
        {
            urls.push(Option.getSiteQueryMask(site));
        });

        const tabs = await chrome.tabs.query({url: urls});

        tabs.forEach(tab =>
        {
            chrome.tabs.reload(tab.id as number)
        });
    }
});
export default Tab;