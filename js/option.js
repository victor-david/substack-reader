import Storage from "./storage.js";
const Option = Object.freeze({
    Schema: "https",
    SubstackHost: "substack.com",
    getHostsAsync: async function () {
        const data = await Storage.getAsync();
        return data.host;
    },
    addHostAsync: async function (host) {
        const hosts = await this.getHostsAsync();
        let haveHost = false;
        hosts.forEach((savedHost) => {
            if (savedHost == host)
                haveHost = true;
        });
        if (!haveHost) {
            hosts.push(host);
            await Storage.setHostsAsync(hosts);
        }
    },
    removeHostAsync: async function (host) {
        const hosts = await this.getHostsAsync();
        hosts.forEach((savedHost) => {
            if (savedHost == host) {
            }
        });
    },
    clearAllHostsAync: async function () {
        await Storage.setHostsAsync([]);
    }
});
export default Option;
