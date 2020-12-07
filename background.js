
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "teams.microsoft.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.from == "everyPageScript") {
    chrome.tabs.query({ url: "*://teams.microsoft.com/*" }, (tabs) => {
      const foundTab = tabs[0];
      if (foundTab) {
        if (message.type === "pressPTTButton") {
          chrome.tabs.sendMessage(foundTab.id, {
            from: "backgroundScript",
            type: message.type,
          });
        } else if (message.type === "releasePTTButton") {
          chrome.tabs.sendMessage(foundTab.id, {
            from: "backgroundScript",
            type: message.type,
          });
        }
      }
    });
  }
});
