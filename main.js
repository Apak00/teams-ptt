chrome.runtime.onMessage.addListener((message) => {
  let micButton = document.getElementById("microphone-button");
  if (!!micButton) {
    if (message.type === "pressPTTButton") {
      micButton.click();
    } else if (message.type === "releasePTTButton") {
      setTimeout(() => {
        micButton.click();
      }, releaseDelay);
    }
  }
});
