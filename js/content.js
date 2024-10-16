import {Values} from "./storage.js";

const ContentScriptId = "id-content-scripts";
const DefaultSiteMask = "https://*.substack.com/*";

const ContentScript =
{
    register: function()
    {
        chrome.scripting.registerContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    matches: [DefaultSiteMask],
                    css: [Values.CssZero]
                }
            ]
        ).catch((err) => console.warn("Registration", err));
    },

    updateCss: async function(cssFile)
    {
        await chrome.scripting.updateContentScripts
        (
            [
                {
                    id: ContentScriptId,
                    css: [cssFile]
                }
            ]
        )
        .catch((err) => console.warn("Update registration", err));


    },

    updateSite: async function()
    {

    }
};

export default ContentScript;