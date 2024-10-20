/**
 * This module provides some utility methods
 */
import Option from "./option.js";

const Util = Object.freeze(
{
    /**
     * The extension page. Even though the address bar can display
     * another browser type (such as brave), the underlying property
     * is still chrome.
     */
    ExtensionPage: "chrome://extensions",

    /**
     * Gets a boolean value that indicates if the specified url starts with https
     *
     * @param url
     * @returns boolean
     */
    isSchema: function(url: string): boolean
    {
        return url.startsWith(Option.Schema);
    },

    /**
     * Gets a boolean value that indicates if the specified url is the extensions page
     *
     * @param url
     * @returns
     */
    isExtensionPage: function(url: string): boolean
    {
        return url.startsWith(this.ExtensionPage);
    },

    /**
     * Gets a boolean value that indicates if the specified url is substack
     *
     * @param url
     * @returns boolean
     */
    isSubstack: function(url: string): boolean
    {
        return url.includes(Option.SubstackHost);
    },

    /**
     * Gets the host name from the specified url
     *
     * @param url
     * @returns string
     */
    getHostName: function(url: string): string
    {
        const obj = new URL(url);
        return obj.hostname;
    },

    /**
     * Gets a host mask for the specified site
     *
     * Omit host parameter to return the host mask for the default host, substack.com
     *
     * @param host
     * @returns string
     */
    getHostQueryMask: function(host?: string): string
    {
        if (!host) host = Option.SubstackHost;
        return Option.Schema + "://*." + host + "/*"
    },

    /**
     * Display sites which have access.
     *
     * This method may only be called from within the context
     * of ui facing pieces such as popup and options because
     * it manipulates the DOM
     *
     * @param nodeId The node id in which to place the list of sites (default div-sites)
     */
    displayHosts: async function(nodeId?:string): Promise<void>
    {
        if (!nodeId) nodeId = "div-sites";
        const ul = document.createElement("ul");
        const liSubstack = document.createElement("li");
        liSubstack.appendChild(document.createTextNode(Option.SubstackHost + " [always]"));
        ul.appendChild(liSubstack);
        const sites = await Option.getHostsAsync();
        sites.forEach(site =>
        {
            const liSite = document.createElement("li");
            liSite.appendChild(document.createTextNode(site));
            ul.appendChild(liSite);
        });
        const node = document.getElementById(nodeId);
        if (node)
        {
            while (node.hasChildNodes()) { node.removeChild(node.firstChild as Node);}
            document.getElementById(nodeId)?.appendChild(ul);
        }
    },

    /**
     * Opens the extension's help page.
     *
     * If the help page isn't open, creates a new tab.
     * If the help page is open, switches to that tab
     */
    openHelpPage: async function(): Promise<void>
    {
        const url = chrome.runtime.getURL("page/help.html");
        const tabs = await chrome.tabs.query({url: [url]});
        if (tabs.length)
        {
            chrome.tabs.update(tabs[0].id as number, {active: true});
        }
        else
        {
            await chrome.tabs.create({ url: url });
        }
    }
});
export default Util;