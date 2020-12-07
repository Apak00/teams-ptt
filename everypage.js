console.log("LOADED EVERYPAGE SCRIPT");

let pttKey;
let releaseDelay = 300;
let callbackForPTTPress;
let callbackForPTTRelease;
let keyIsDown;

if (!callbackForPTTPress) {
  callbackForPTTPress = (value) => {
    if (chrome.storage) {
      chrome.storage.sync.get("pttKey", function (data) {
        pttKey = data.pttKey;
      });

      if ((value.key || value.button) === pttKey && !keyIsDown) {
        keyIsDown = true;
        chrome.tabs.query({ url: "*://teams.microsoft.com/*" }, (tabs) => {
          const foundTab = tabs[0];
          if (foundTab) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "pressPTTButton" });
          }
        });
      }
    }
  };

  document.addEventListener("keydown", callbackForPTTPress);
  document.addEventListener("mousedown", callbackForPTTPress);
}

if (!callbackForPTTRelease) {
  callbackForPTTRelease = (value) => {
    if (chrome.storage) {
      chrome.storage.sync.get("releaseDelay", function (data) {
        releaseDelay =
          data.releaseDelay === undefined ? releaseDelay : data.releaseDelay;
      });

      if ((value.key || value.button) === pttKey && keyIsDown) {
        keyIsDown = false;
        chrome.tabs.query({ url: "*://teams.microsoft.com/*" }, (tabs) => {
          const foundTab = tabs[0];
          if (foundTab) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "releasePTTButton" });
          }
        });
      }
    }
  };

  document.addEventListener("keyup", callbackForPTTRelease);
  document.addEventListener("mouseup", callbackForPTTRelease);
}
