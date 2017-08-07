(function() {
        if (window.location.hostname == 'twitter.com') {
                var element = $('#tweet-box-home-timeline');

                var input = element.text();
                var decrypt = unicodeDecrypt(input);
                element.text(unicodeEncrypt(decrypt));

                var range = document.createRange();
                range.selectNodeContents(element[0]);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                element.on('input', function() {
                        var input = element.text();
                        var decrypt = unicodeDecrypt(input);
                        element.text(unicodeEncrypt(decrypt));

                        var range = document.createRange();
                        range.selectNodeContents(element[0]);
                        range.collapse(false);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                });
        }
})();