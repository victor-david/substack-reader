import {Values} from "./storage.js";
import Option from "./option.js";
import Util from "./util.js";

const ContentScriptId = "id-content-scripts";

const ContentScript = Object.freeze(
{
    /**
     * Registers the content scripts
     *
     * This method is called from service worker at installation and startup
     */
    registerAsync: async function(): Promise<void>
    {
        const hostMatches = await Private.getHostMatchesAsync();

        await chrome.scripting.registerContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    matches: hostMatches,
                    css: [Values.CssZero]
                }
            ]
        ).catch((err) => console.warn("Registration", err));
    },

    /**
     * Updates the css file used by the content scripts
     *
     * @param {string} cssFile
     */
    updateCssAsync: async function(cssFile: string): Promise<void>
    {
        await chrome.scripting.updateContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    css: [cssFile]
                }
            ]
        ).catch((err) => console.warn("Update content scripts (CSS)", err));
    },

    /**
     * Updates the hosts for the content scripts
     */
    updateHostMatchesAsync: async function(): Promise<void>
    {
        const hostMatches = await Private.getHostMatchesAsync();

        await chrome.scripting.updateContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    matches: hostMatches,
                }
            ]
        ).catch((err) => console.warn("Update content scripts (Matches)", err));
    }
});

const Private =
{
    getHostMatchesAsync: async function()
    {
        let matches = [Util.getHostQueryMask()];
        let hosts = await Option.getHostsAsync();
        hosts.forEach(host =>
        {
            matches.push(Util.getHostQueryMask(host));
        });
        return matches;
    },
};

export default ContentScript;