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
        return url.includes(Option.SubstackDomain);
    },

    /**
     * Gets a site mask for the specified site
     *
     * Omit site parameter to return the site mask for substack.com
     *
     * @param site
     * @returns string
     */
    getSiteQueryMask: function(site?: string): string
    {
        if (!site) site = Option.SubstackDomain;
        return Option.Schema + "://*." + site + "/*"
    },



});
export default Util;