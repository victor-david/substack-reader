import Option from "./option.js";
const SiteSuffix = ".substack.com";
const Rules = {
    setContentRulesAsync: async function () {
        chrome.action.disable();
        const sites = await Option.getSitesAsync();
        chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
            const mainRule = {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostSuffix: SiteSuffix },
                    })
                ],
                actions: [new chrome.declarativeContent.ShowAction(chrome.declarativeContent.ShowAction)],
            };
            sites.forEach(site => {
                mainRule.conditions.push(new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: "." + site },
                }));
            });
            const rules = [mainRule];
            chrome.declarativeContent.onPageChanged.addRules(rules);
        });
    }
};
export default Rules;
