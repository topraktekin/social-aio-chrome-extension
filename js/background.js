
	const defaultSettings = {
	  action_click: 10,
	  min_delay: 5,
	  max_delay: 10
	};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('settings', (items) => {
    if (!items.settings) {
      chrome.storage.sync.set({settings: defaultSettings}, () => {
      });
    }
  });
});