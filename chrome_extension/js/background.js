var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
        toggle = !toggle;
        if(toggle){
                var promise = new Promise(function(resolve, reject) {
                        chrome.browserAction.setIcon({path: "icons/on.png", tabId: tab.id}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/grapheme-splitter-1.0.1.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/lib.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/encrypt.js"}, resolve);
                });
        }
        else{
                var promise = new Promise(function(resolve, reject) {
                        chrome.browserAction.setIcon({path: "icons/off.png", tabId: tab.id}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/grapheme-splitter-1.0.1.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/lib.js"}, resolve);
                }).then(function(resolve, reject) {
                        chrome.tabs.executeScript(tab.id, {file:"js/decrypt.js"}, resolve);
                });
        }
});
