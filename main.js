console.log("LOADEDED CONTENT SCRIPT");

// if (!callbackForPTTPress) {
//   callbackForPTTPress = (value) => {
//     if (chrome.storage) {
//       micButton = document.getElementById("microphone-button");

//       chrome.storage.sync.get("pttKey", function (data) {
//         pttKey = data.pttKey;
//       });

//       if ((value.key || value.button) === pttKey && !!micButton && !keyIsDown) {
//         keyIsDown = true;
//         micButton.click();
//       }
//     }
//   };

//   document.addEventListener("keydown", callbackForPTTPress);
//   document.addEventListener("mousedown", callbackForPTTPress);
// }

// if (!callbackForPTTRelease) {
//   callbackForPTTRelease = (value) => {
//     if (chrome.storage) {
//       chrome.storage.sync.get("releaseDelay", function (data) {
//         releaseDelay =
//           data.releaseDelay === undefined ? releaseDelay : data.releaseDelay;
//       });

//       if ((value.key || value.button) === pttKey && !!micButton && keyIsDown) {
//         keyIsDown = false;
//         setTimeout(() => {
//           micButton.click();
//         }, releaseDelay);
//       }
//     }
//   };

//   document.addEventListener("keyup", callbackForPTTRelease);
//   document.addEventListener("mouseup", callbackForPTTRelease);
// }

chrome.runtime.onMessage.addListener((request) => {
  let micButton = document.getElementById("microphone-button");
  if (!!micButton) {
    if (request.action === "pressPTTButton") {
      micButton.click();
    } else if (request.action === "releasePTTButton") {
      setTimeout(() => {
        micButton.click();
      }, releaseDelay);
    }
  }
});
