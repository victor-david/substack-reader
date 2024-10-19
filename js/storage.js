const storage = chrome.storage.local;
const Values = Object.freeze({
    CssZero: "css/substack.zero.css",
    CssLight: "css/substack.light.css",
    CssDark: "css/substack.dark.css",
    TextZero: "Off",
    TextLight: "Light",
    TextDark: "Dark"
});
const DefaultValues = Object.freeze({
    file: Values.CssZero,
    text: Values.TextZero,
    host: []
});
class StorageObject {
    file = DefaultValues.file;
    text = DefaultValues.text;
    host = DefaultValues.host;
    constructor(raw) {
        this.file = raw.file;
        this.text = raw.text;
        this.host = raw.host;
    }
}
const Storage = Object.freeze({
    getAsync: async function () {
        const raw = await storage.get(DefaultValues);
        return new StorageObject(raw);
    },
    setStateAsync: async function (badgeText, cssFile) {
        return await storage.set({ file: cssFile, text: badgeText });
    },
    setHostsAsync: async function (hosts) {
        if (Array.isArray(hosts)) {
            await storage.set({ host: hosts });
        }
    },
    clearAsync: async function () {
        await storage.clear();
    }
});
export { Values, Storage };
export default Storage;
