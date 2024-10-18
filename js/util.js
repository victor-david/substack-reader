import Option from "./option.js";
const Util = Object.freeze({
    ExtensionPage: "chrome://extensions",
    isSchema: function (url) {
        return url.startsWith(Option.Schema);
    },
    isExtensionPage: function (url) {
        return url.startsWith(this.ExtensionPage);
    },
    isSubstack: function (url) {
        return url.includes(Option.SubstackDomain);
    },
    getSiteQueryMask: function (site) {
        if (!site)
            site = Option.SubstackDomain;
        return Option.Schema + "://*." + site + "/*";
    },
});
export default Util;
