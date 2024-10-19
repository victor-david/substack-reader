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
     * Gets a boolean value that indicates if the specified hosts exists in storage
     *
     * @param host
     * @returns boolean
     */
    haveHost: async function(host: string): Promise<boolean>
    {
        let haveHost = false;
        const hosts = await this.getHostsAsync();

        hosts.forEach((savedHost: string) =>
        {
            if (savedHost == host) haveHost = true;
        });
        return haveHost;
    },

    /**
     * Adds a host to storage if it doesn't already exist.
     *
     * @param host
     */
    addHostAsync: async function(host: string)
    {
        let haveHost = false;
        const hosts = await this.getHostsAsync();

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
        let hostIndex = -1;
        hosts.forEach((savedHost:string, index: number) =>
        {
            if (savedHost == host)
            {
                hostIndex = index;
            }
        });

        if (hostIndex > -1)
        {
            hosts.splice(hostIndex, 1);
            await Storage.setHostsAsync(hosts);
        }
    },
    clearAllHostsAync: async function()
    {
        await Storage.setHostsAsync([]);
    }
});
export default Option;