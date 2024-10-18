const storage = chrome.storage.local;
const Values = {
    CssZero: "css/substack.zero.css",
    CssLight: "css/substack.light.css",
    CssDark: "css/substack.dark.css",
    TextZero: "Off",
    TextLight: "Light",
    TextDark: "Dark"
};
const Storage = {
    DefaultValues: {
        file: Values.CssZero,
        text: Values.TextZero,
        host: []
    },
    getAsync: async function () {
        return await storage.get(this.DefaultValues);
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
        return await storage.clear();
    }
};
export { Values, Storage };
export default Storage;
