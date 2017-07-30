var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
        toggle = !toggle;
        if(toggle){
                chrome.browserAction.setIcon({path: "icons/on.png", tabId: tab.id});
                chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"}, function() {
                        chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"}, function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/lib.js"}, function() {
                                        chrome.tabs.executeScript(tab.id, {file:"js/encrypt.js"});
});
                        });
                });
        }
        else{
                chrome.browserAction.setIcon({path: "icons/off.png", tabId: tab.id});
                chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"}, function() {
                        chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"}, function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/lib.js"}, function() {
                                        chrome.tabs.executeScript(tab.id, {file:"js/decrypt.js"});
});
                        });
                });
        }
});
