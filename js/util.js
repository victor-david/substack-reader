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
    displaySites: async function (nodeId) {
        if (!nodeId)
            nodeId = "div-sites";
        const ul = document.createElement("ul");
        const liSubstack = document.createElement("li");
        liSubstack.appendChild(document.createTextNode(Option.SubstackDomain + " [always]"));
        ul.appendChild(liSubstack);
        const sites = await Option.getSitesAsync();
        sites.forEach(site => {
            const liSite = document.createElement("li");
            liSite.appendChild(document.createTextNode(site));
            ul.appendChild(liSite);
        });
        const node = document.getElementById(nodeId);
        if (node) {
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            document.getElementById(nodeId)?.appendChild(ul);
        }
    }
});
export default Util;
