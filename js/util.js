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
        return url.includes(Option.SubstackHost);
    },
    getHostName: function (url) {
        const obj = new URL(url);
        return obj.hostname;
    },
    getHostQueryMask: function (host) {
        if (!host)
            host = Option.SubstackHost;
        return Option.Schema + "://*." + host + "/*";
    },
    displayHosts: async function (nodeId) {
        if (!nodeId)
            nodeId = "div-sites";
        const ul = document.createElement("ul");
        const liSubstack = document.createElement("li");
        liSubstack.appendChild(document.createTextNode(Option.SubstackHost + " [always]"));
        ul.appendChild(liSubstack);
        const sites = await Option.getHostsAsync();
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
    },
    openHelpPage: async function () {
        const url = chrome.runtime.getURL("page/help.html");
        const tabs = await chrome.tabs.query({ url: [url] });
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { active: true });
        }
        else {
            await chrome.tabs.create({ url: url });
        }
    }
});
export default Util;
