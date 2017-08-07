(function() {
        if (window.location.hostname == 'twitter.com') {
                var element = $('#tweet-box-home-timeline');

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

                processDecrypt();

                element.on('input', function(event) {
                        processDecrypt();
                });
        }
})();
