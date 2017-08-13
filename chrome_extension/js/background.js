function handleUnicodeObfuscationStart(tab) {
        chrome.storage.local.get({'OBFUSCATION_ON': false}, function(object) {
                var on = object.OBFUSCATION_ON;

                if(on){
                        var promise = new Promise(function(resolve, reject) {
                                chrome.browserAction.setIcon({path: "icons/on.png"}, resolve);
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/grapheme-splitter-1.0.1.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/lib.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/encrypt.js"});
                        });
                }
                else{
                        var promise = new Promise(function(resolve, reject) {
                                chrome.browserAction.setIcon({path: "icons/off.png"}, resolve);
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.min.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/underscore-1.8.3.min.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/grapheme-splitter-1.0.1.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/lib.js"});
                        }).then(function() {
                                chrome.tabs.executeScript(tab.id, {file:"js/decrypt.js"});
                        });
                }
        });
}

chrome.browserAction.onClicked.addListener(function(tab) {
        var promise = new Promise(function(resolve, reject) {
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

        if (url.host.includes('twitter.com')) {
                handleUnicodeObfuscationStart(tab);
        }
});
