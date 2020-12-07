const pttKeyInput = document.getElementById("ptt-key");
const releaseDelayInput = document.getElementById("relase-delay");

pttKeyInput.addEventListener("keydown", function () {
  pttKeyInput.value = "";
});

pttKeyInput.addEventListener("keyup", function (value) {
  pttKeyInput.value = value.key;
  chrome.storage.sync.set({ pttKey: value.key }, function () {
    console.log("PTT KEY set to: ", value.key);
  });
});

pttKeyInput.addEventListener("mouseup", function (value) {
  const buttonNo = value.button;
  if (buttonNo !== 0 && buttonNo !== 1) {
    pttKeyInput.value = `Mouse ${buttonNo}`;
    chrome.storage.sync.set({ pttKey: buttonNo }, function () {
      console.log("PTT KEY set to: ", value.key);
    });
  }
});

chrome.storage.sync.get("pttKey", function (data) {
  pttKeyInput.value =
    typeof data.pttKey === "string"
      ? data.pttKey
      : typeof data.pttKey === "number"
      ? `Mouse ${data.pttKey}`
      : "";
});

releaseDelayInput.addEventListener("change", function (event) {
  const releaseDelay = parseInt(event.target.value, 10);
  chrome.storage.sync.set({ releaseDelay }, function () {
    console.log("PTT Release delay set to: ", releaseDelay);
  });
});

chrome.storage.sync.get("releaseDelay", function (data) {
  releaseDelayInput.value =
    typeof data.releaseDelay === "number" ? data.releaseDelay : "";
});
