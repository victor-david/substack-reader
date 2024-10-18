import Option from "./option.js";
import Util from "./util.js";
const Tab = Object.freeze({
    getCurrentTabAsync: async function () {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    },
    reloadTabsAsync: async function () {
        const urls = [Util.getHostQueryMask()];
        const sites = await Option.getHostsAsync();
        sites.forEach(site => {
            urls.push(Util.getHostQueryMask(site));
        });
        const tabs = await chrome.tabs.query({ url: urls });
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id);
        });
    }
});
export default Tab;
