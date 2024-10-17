const storage = chrome.storage.local;

const Values =
{
    CssZero     : "css/substack.zero.css",
    CssLight    : "css/substack.light.css",
    CssDark     : "css/substack.dark.css",
    TextZero    : "Off",
    TextLight   : "Light",
    TextDark    : "Dark"
};

const Storage =
{
    DefaultValues:
    {
        file: Values.CssZero,
        text: Values.TextZero,
        site: []
    },

    /**
     * Gets the storage object. Returns default values if needed.
     *
     * @returns object
     */
    getAsync: async function()
    {
        return await storage.get(this.DefaultValues);
    },

    setStateAsync: async function(badgeText, cssFile)
    {
        return await storage.set({file:cssFile, text: badgeText});
    },

    /**
     * Sets sites. Called by Options
     *
     * @param array sites
     */
    setSitesAsync: async function(sites)
    {
        if (Array.isArray(sites))
        {
            await storage.set({site:sites});
        }
    },

    clearAsync: async function()
    {
        return await storage.clear();
    }
};

export {Values, Storage};
export default Storage;