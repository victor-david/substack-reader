// ------------------------------------------------
// This module deals with declarative content rules
// ------------------------------------------------

// always included in rules
const SiteSuffix = ".substack.com";

const Rules =
{
    /**
     * Sets the declarative content rules
     */
    setContentRules: function()
    {
        chrome.action.disable();

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

            // if(true)
            // {
            //     mainRule.conditions.push(

            //         new chrome.declarativeContent.PageStateMatcher(
            //             {
            //                 pageUrl: {hostSuffix: ".mexicolisto.com"},
            //             })
            //     );

            // }

            // const secRule =
            // {
            //     conditions:
            //     [
            //         new chrome.declarativeContent.PageStateMatcher(
            //             {
            //                 pageUrl: {hostSuffix: ".mexicolisto.com"},
            //             })
            //     ],
            //     actions: [new chrome.declarativeContent.ShowAction()],
            // };

            // Finally, apply our new array of rules
            const rules = [mainRule];
            chrome.declarativeContent.onPageChanged.addRules(rules);
        });
    }
};
export default Rules;