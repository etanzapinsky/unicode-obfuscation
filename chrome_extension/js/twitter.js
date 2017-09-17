// Only inject this function on the page if it doesn't exist yet
if (typeof obfuscate != 'function') {
        function obfuscate() {
                var element = $('#tweet-box-home-timeline');

                function processObfuscate() {
                        var clonedElement = element.clone();

                        // preprocess element's emoji symbols so cloned element has actual unicode
                        // value, not weird html spans
                        var richEmojis = clonedElement.find('span.RichEditor-pictographText');
                        _.each(richEmojis, function(emoji) {
                                var unicode = $(emoji).attr('data-pictograph-text');
                                $(emoji).text(unicode);
                        });

                        var input = clonedElement.text();
                        element.text(unicodeObfuscate(input));

                        var range = document.createRange();
                        range.selectNodeContents(element[0]);
                        range.collapse(false);

                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                }

                function processDeobfuscate() {
                        var clonedElement = element.clone();

                        // preprocess element's emoji symbols so cloned element has actual unicode
                        // value, not weird html spans
                        var richEmojis = clonedElement.find('span.RichEditor-pictographText');
                        _.each(richEmojis, function(emoji) {
                                var unicode = $(emoji).attr('data-pictograph-text');
                                $(emoji).text(unicode);
                        });

                        var input = clonedElement.text();
                        var deobfuscate = unicodeDeobfuscate(input);
                        element.text(deobfuscate);

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
                                processObfuscate();
                        } else {
                                processDeobfuscate();
                        }
                });


                element.on('input', function(event) {
                        if (obfuscationOn) {
                                processObfuscate();
                        } else {
                                processDeobfuscate();
                        }
                });
        }

        obfuscate();
}
