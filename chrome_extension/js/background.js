function lastErrorCallback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}

function initTwitterUnicodeObfuscation(tab) {
        return new Promise(function(resolve, reject) {
                chrome.browserAction.setIcon({path: "icons/off.png"}, function() {
                        lastErrorCallback();
                        resolve();
                });
        }).then(function() {
                chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"}, lastErrorCallback);
        }).then(function() {
                chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"}, lastErrorCallback);
        }).then(function() {
                chrome.tabs.executeScript(tab.id, {file:"js/grapheme-splitter-1.0.1.js"}, lastErrorCallback);
        }).then(function() {
                chrome.tabs.executeScript(tab.id, {file:"js/lib.js"}, lastErrorCallback);
        }).then(function() {
                chrome.tabs.executeScript(tab.id, {file:"js/twitter.js"}, lastErrorCallback);
        });
}

function handleUnicodeObfuscationStart(tab) {
        chrome.storage.local.get({'OBFUSCATION_ON': false}, function(object) {
                var on = object.OBFUSCATION_ON;

                if (on) {
                        chrome.browserAction.setIcon({path: "icons/on.png"}, lastErrorCallback);
                } else {
                        chrome.browserAction.setIcon({path: "icons/off.png"}, lastErrorCallback);
                }

                chrome.tabs.sendMessage(tab.id, {'obfuscationOn': on});
        });
}

chrome.browserAction.onClicked.addListener(function(tab) {
        new Promise(function(resolve, reject) {
                chrome.storage.local.get({'OBFUSCATION_ON': false}, function(object) {
                        var on = object.OBFUSCATION_ON;
                        
                        resolve(on);
                });
        }).then(function(on) {
                // toggle on
                on = !on

                chrome.storage.local.set({'OBFUSCATION_ON': on}, function() {
                        handleUnicodeObfuscationStart(tab);
                });
        });
});

chrome.tabs.onActivated.addListener(function(object) {
        chrome.tabs.get(object.tabId, function(tab) {
                handleUnicodeObfuscationStart(tab);
        });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        var url = new URL(tab.url);

        if (changeInfo.status === 'complete' && url.host.includes('twitter.com')) {
                initTwitterUnicodeObfuscation(tab).then(function() {
                        handleUnicodeObfuscationStart(tab);
                });
        }
});
