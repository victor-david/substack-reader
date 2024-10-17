import {Values} from "./storage.js";
import Option from "./option.js";

const ContentScriptId = "id-content-scripts";
const DefaultSiteMask = "https://*.substack.com/*";

const ContentScript =
{
    registerAsync: async function()
    {
        const siteMatches = await Private.getSiteMatchesAsync();

        await chrome.scripting.registerContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    matches: siteMatches,
                    css: [Values.CssZero]
                }
            ]
        ).catch((err) => console.warn("Registration", err));
    },

    updateCssAsync: async function(cssFile: string)
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

    updateSiteMatchesAsync: async function()
    {
        const siteMatches = await Private.getSiteMatchesAsync();

        await chrome.scripting.updateContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    matches: siteMatches,
                }
            ]
        ).catch((err) => console.warn("Update content scripts (Matches)", err));
    }
};

const Private =
{
    getSiteMatchesAsync: async function()
    {
        let matches = [DefaultSiteMask];
        let sites = await Option.getSitesAsync();
        sites.forEach(site =>
        {
            matches.push("https://*." + site + "/*")
        });
        return matches;
    },
};

export default ContentScript;