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