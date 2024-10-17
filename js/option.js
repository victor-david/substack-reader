/**
 * This module handles extension options
 */
import Storage from "./storage.js";

const Option =
{
    /**
     * Gets the sites from storage
     *
     * @returns array
     */
    getSites: async function()
    {
        const data = await Storage.get();
        return data.site;
    },

    /**
     * Adds a site to storage if it doesn't already exist.
     *
     * @param string site
     */
    addSite: async function(site)
    {
        const sites = await this.getSites();

        sites.forEach(savedSite =>
        {
            if (savedSite == site) return;
        });
        sites.push(site);
        await Storage.setSites(sites);
    },

    /**
     * Removes a site from storage if it exists
     *
     * @param string site
     */
    removeSite: async function(site)
    {
        const sites = await this.getSites();
        sites.forEach(savedSite =>
        {
            if (savedSite == site)
            {

            }
        });

    }
};
export default Option;