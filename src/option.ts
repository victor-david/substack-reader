/**
 * This module handles extension options
 */
import Storage from "./storage.js";

const Option = Object.freeze(
{
    /**
     * The schema. Extension only works with https.
     */
    Schema: "https",

    /**
     * The substack domain
     */
    SubstackDomain: "substack.com",

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
        if (!site) site = this.SubstackDomain;
        return this.Schema + "://*." + site + "/*"
    },

    /**
     * Gets the sites from storage (async)
     *
     * @returns array
     */
    getSitesAsync: async function(): Promise<string[]>
    {
        const data = await Storage.getAsync();
        return data.site;
    },

    /**
     * Adds a site to storage if it doesn't already exist.
     *
     * @param site
     */
    addSiteAsync: async function(site: string)
    {
        const sites = await this.getSitesAsync();
        let haveSite = false;

        sites.forEach((savedSite: string) =>
        {
            if (savedSite == site) haveSite = true;
        });
        if (!haveSite)
        {
            sites.push(site);
            await Storage.setSitesAsync(sites);
        }
    },

    /**
     * Removes a site from storage if it exists
     *
     * @param site
     */
    removeSiteAsync: async function(site: string)
    {
        const sites = await this.getSitesAsync();
        sites.forEach((savedSite:string) =>
        {
            if (savedSite == site)
            {

            }
        });
    },
    clearAllSitesAync: async function()
    {
        await Storage.setSitesAsync([]);
    }
});
export default Option;