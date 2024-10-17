import Option from "./option.js";
const Tab = Object.freeze({
    getCurrentTabAsync: async function () {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    },
    reloadTabsAsync: async function () {
        const urls = [Option.getSiteQueryMask()];
        const sites = await Option.getSitesAsync();
        sites.forEach(site => {
            urls.push(Option.getSiteQueryMask(site));
        });
        const tabs = await chrome.tabs.query({ url: urls });
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id);
        });
    }
});
export default Tab;
