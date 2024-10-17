const Tab = {
    getCurrentTabAsync: async function () {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    },
    reloadTabsAsync: async function () {
        const tabs = await chrome.tabs.query({
            url: ["https://*.substack.com/*"]
        });
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id);
        });
    }
};
export default Tab;
