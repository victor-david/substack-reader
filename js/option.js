import ContentScript from "./content.js";
import Storage from "./storage.js";
const Option = Object.freeze({
    Schema: "https",
    SubstackHost: "substack.com",
    getHostsAsync: async function () {
        const data = await Storage.getAsync();
        return data.host;
    },
    haveHost: async function (host) {
        let haveHost = false;
        const hosts = await this.getHostsAsync();
        hosts.forEach((savedHost) => {
            if (savedHost == host)
                haveHost = true;
        });
        return haveHost;
    },
    addHostAsync: async function (host) {
        let haveHost = false;
        const hosts = await this.getHostsAsync();
        hosts.forEach((savedHost) => {
            if (savedHost == host)
                haveHost = true;
        });
        if (!haveHost) {
            hosts.push(host);
            await Storage.setHostsAsync(hosts);
            await ContentScript.updateHostMatchesAsync();
        }
    },
    removeHostAsync: async function (host) {
        const hosts = await this.getHostsAsync();
        let hostIndex = -1;
        hosts.forEach((savedHost, index) => {
            if (savedHost == host) {
                hostIndex = index;
            }
        });
        if (hostIndex > -1) {
            hosts.splice(hostIndex, 1);
            await Storage.setHostsAsync(hosts);
            await ContentScript.updateHostMatchesAsync();
        }
    },
    clearAllHostsAync: async function () {
        await Storage.setHostsAsync([]);
        await ContentScript.updateHostMatchesAsync();
    }
});
export default Option;
