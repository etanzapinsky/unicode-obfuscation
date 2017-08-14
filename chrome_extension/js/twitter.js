(function() {
        var element = $('#tweet-box-home-timeline');

        function processEncrypt() {
                var clonedElement = element.clone();

                // preprocess element's emoji symbols so cloned element has actual unicode
                // value, not weird html spans
                var richEmojis = clonedElement.find('span.RichEditor-pictographText');
                _.each(richEmojis, function(emoji) {
                        var unicode = $(emoji).attr('data-pictograph-text');
                        $(emoji).text(unicode);
                });

                var input = clonedElement.text();
                element.text(unicodeEncrypt(input));

                var range = document.createRange();
                range.selectNodeContents(element[0]);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
        }

        function processDecrypt() {
                var clonedElement = element.clone();

                // preprocess element's emoji symbols so cloned element has actual unicode
                // value, not weird html spans
                var richEmojis = clonedElement.find('span.RichEditor-pictographText');
                _.each(richEmojis, function(emoji) {
                        var unicode = $(emoji).attr('data-pictograph-text');
                        $(emoji).text(unicode);
                });

                // this input is definitely in local storage since this is the base
                var input = clonedElement.text();
                var decrypt = unicodeDecrypt(input);
                element.text(decrypt);

                var range = document.createRange();
                range.selectNodeContents(element[0]);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
        }

        var obfuscationOn;
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
                obfuscationOn = message.obfuscationOn;

                if (obfuscationOn) {
                        processEncrypt();
                } else {
                        processDecrypt();
                }
        });


        element.on('input', function(event) {
                if (obfuscationOn) {
                        processEncrypt();
                } else {
                        processDecrypt();
                }
        });
})();
