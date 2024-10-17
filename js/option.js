import Storage from "./storage.js";
const Option = Object.freeze({
    SubstackDomain: "substack.com",
    getSitesAsync: async function () {
        const data = await Storage.getAsync();
        return data.site;
    },
    addSiteAsync: async function (site) {
        const sites = await this.getSitesAsync();
        let haveSite = false;
        sites.forEach((savedSite) => {
            if (savedSite == site)
                haveSite = true;
        });
        if (!haveSite) {
            sites.push(site);
            await Storage.setSitesAsync(sites);
        }
    },
    removeSiteAsync: async function (site) {
        const sites = await this.getSitesAsync();
        sites.forEach((savedSite) => {
            if (savedSite == site) {
            }
        });
    },
    clearAllSitesAync: async function () {
        await Storage.setSitesAsync([]);
    }
});
export default Option;
