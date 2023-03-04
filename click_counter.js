// JavaScript source code
var clicks = 0;

var currentURL = "";

chrome.storage.local.set({ 'clicks': clicks }, function () {
    console.log('Value is set to ' + clicks);
});

function updateCurrentURL() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var newURL = tabs[0].url;
        if (newURL !== currentURL) {
            currentURL = newURL;
            clicks++;
            document.getElementById("click-count").innerHTML = clicks;
        }
    });
}

function createPanel() {
    var panel = document.createElement("div");
    panel.id = "click-panel";
    panel.style.cssText = "position: fixed; bottom: 0; right: 0; padding: 10px; background-color: #f2f2f2;";
    var clicksSpan = document.createElement("span");
    clicksSpan.id = "click-count";
    clicksSpan.innerHTML = clicks;
    panel.appendChild(clicksSpan);
    document.body.appendChild(panel);
}

document.addEventListener("click", function () {
    clicks++;
    console.log("addevent click");
    if (clicks == 1) {
        createPanel();
    }
    document.getElementById("click-count").innerHTML = clicks;

    chrome.storage.local.set({ 'clicks': clicks }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        } else {
            console.log("Value stored successfully.");
        }
    });

});



//chrome.tabs.onUpdated.addListener(updateCurrentURL);
/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        console.log("Tab loaded: " + tab.url);
    }
});
*/
