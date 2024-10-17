// ------------------------------------------------
// This module deals with declarative content rules
// ------------------------------------------------
import Option from "./option.js";

// always included in rules
const SiteSuffix = ".substack.com";

const Rules =
{
    /**
     * Sets the declarative content rules
     */
    setContentRulesAsync: async function()
    {
        chrome.action.disable();

        const sites = await Option.getSitesAsync();

        chrome.declarativeContent.onPageChanged.removeRules(undefined, () =>
        {
            const mainRule =
            {
                conditions:
                [
                    new chrome.declarativeContent.PageStateMatcher(
                        {
                            pageUrl: {hostSuffix: SiteSuffix},
                        })
                ],
                actions: [new chrome.declarativeContent.ShowAction()],
            };

            sites.forEach(site =>
            {
                mainRule.conditions.push
                (
                    new chrome.declarativeContent.PageStateMatcher(
                        {
                            pageUrl: {hostSuffix: "." + site},
                        })
                );
            });

            // Finally, apply our new array of rules
            const rules = [mainRule];
            chrome.declarativeContent.onPageChanged.addRules(rules);
        });
    }
};
export default Rules;