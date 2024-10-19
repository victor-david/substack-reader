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
        host: []
    },

    /**
     * Gets the storage object. Returns default values if needed.
     *
     * @returns
     */
    getAsync: async function()
    {
        return await storage.get(this.DefaultValues);
    },

    setStateAsync: async function(badgeText: string, cssFile: string): Promise<void>
    {
        return await storage.set({file:cssFile, text: badgeText});
    },

    /**
     * Sets hosts. Called by Options
     *
     * @param {array<string>} hosts
     */
    setHostsAsync: async function(hosts: Array<string>): Promise<void>
    {
        if (Array.isArray(hosts))
        {
            await storage.set({host:hosts});
        }
    },

    /**
     * Clears all storage
     */
    clearAsync: async function(): Promise<void>
    {
        await storage.clear();
    }
};

export {Values, Storage};
export default Storage;