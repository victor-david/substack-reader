/**
 * This module handles tab operations
 */
import Option from "./option.js";
import Util from "./util.js";

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
     * Gets the url from the tab, either its url or pending, or empty string
     *
     * @param tab
     *
     * @returns string
     */
    getTabUrl: function(tab?: chrome.tabs.Tab): string
    {
        if (tab)
        {
            if (tab.url?.length)
            {
                return tab.url;
            }
            if (tab.pendingUrl?.length)
            {
                return tab.pendingUrl;
            }
        }
        return "";
    },

    /**
     * Reloads all qualified tabs, tabs that host content from the substack domain (default)
     * and all other sites that have been specified by the user.
     */
    reloadTabsAsync: async function (): Promise<void>
    {
        const urls = [Util.getHostQueryMask()];
        const sites = await Option.getHostsAsync();

        sites.forEach(site =>
        {
            urls.push(Util.getHostQueryMask(site));
        });

        const tabs = await chrome.tabs.query({url: urls});

        tabs.forEach(tab =>
        {
            chrome.tabs.reload(tab.id as number)
        });
    }
});
export default Tab;