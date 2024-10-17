/**
 * This module handles tab operations
 */
const Tab =
{
    getCurrentTabAsync: async function()
    {
        const options = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(options);
        return tab;
    }
};
export default Tab;