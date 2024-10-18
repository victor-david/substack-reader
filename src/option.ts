/**
 * This module handles extension options
 */
import Storage from "./storage.js";

const Option = Object.freeze(
{
    /**
     * The schema. Extension only works with https.
     */
    Schema: "https",

    /**
     * The substack host
     */
    SubstackHost: "substack.com",

    /**
     * Gets the hosts from storage (async)
     *
     * @returns array
     */
    getHostsAsync: async function(): Promise<string[]>
    {
        const data = await Storage.getAsync();
        return data.host;
    },

    /**
     * Adds a host to storage if it doesn't already exist.
     *
     * @param host
     */
    addHostAsync: async function(host: string)
    {
        const hosts = await this.getHostsAsync();
        let haveHost = false;

        hosts.forEach((savedHost: string) =>
        {
            if (savedHost == host) haveHost = true;
        });
        if (!haveHost)
        {
            hosts.push(host);
            await Storage.setHostsAsync(hosts);
        }
    },

    /**
     * Removes a host from storage if it exists
     *
     * @param host
     */
    removeHostAsync: async function(host: string)
    {
        const hosts = await this.getHostsAsync();
        hosts.forEach((savedHost:string) =>
        {
            if (savedHost == host)
            {

            }
        });
    },
    clearAllHostsAync: async function()
    {
        await Storage.setHostsAsync([]);
    }
});
export default Option;