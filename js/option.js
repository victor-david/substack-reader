/**
 * This module handles extension options
 */
import Storage from "./storage.js";

const Option =
{
    SubstackDomain: "substack.com",

    /**
     * Gets the sites from storage (async)
     *
     * @returns array
     */
    getSitesAsync: async function()
    {
        const data = await Storage.getAsync();
        return data.site;
    },

    /**
     * Adds a site to storage if it doesn't already exist.
     *
     * @param string site
     */
    addSiteAsync: async function(site)
    {
        const sites = await this.getSitesAsync();

        sites.forEach(savedSite =>
        {
            if (savedSite == site) return;
        });
        sites.push(site);
        await Storage.setSitesAsync(sites);
    },

    /**
     * Removes a site from storage if it exists
     *
     * @param string site
     */
    removeSiteAsync: async function(site)
    {
        const sites = await this.getSitesAsync();
        sites.forEach(savedSite =>
        {
            if (savedSite == site)
            {

            }
        });

    }
};
export default Option;