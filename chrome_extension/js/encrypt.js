(function() {
        if (window.location.hostname == 'twitter.com') {
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

                processEncrypt();

                element.on('input', function(event) {
                        processEncrypt();
                });
        }
})();
