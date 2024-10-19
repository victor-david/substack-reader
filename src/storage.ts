const storage = chrome.storage.local;

const Values = Object.freeze(
{
    CssZero     : "css/substack.zero.css",
    CssLight    : "css/substack.light.css",
    CssDark     : "css/substack.dark.css",
    TextZero    : "Off",
    TextLight   : "Light",
    TextDark    : "Dark"
});

const DefaultValues = Object.freeze(
{
    file: Values.CssZero,
    text: Values.TextZero,
    host: []
});

class StorageObject
{
    file = DefaultValues.file;
    text = DefaultValues.text;
    host = DefaultValues.host;

    constructor(raw: any)
    {
        this.file = raw.file;
        this.text = raw.text;
        this.host = raw.host;
    }
}

const Storage = Object.freeze(
{
    /**
     * Gets the storage object. Returns default values if needed.
     *
     * @returns {Promise<StorageObject>}
     */
    getAsync: async function(): Promise<StorageObject>
    {
        const raw = await storage.get(DefaultValues);
        return new StorageObject(raw);
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
});

export {Values, Storage};
export default Storage;