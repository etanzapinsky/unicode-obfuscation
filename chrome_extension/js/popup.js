(function() {
        var ENCRPYTION_MAP = {
                'a': ['ª', '∀', '⟑', 'α'],
                'b': ['฿', 'В', 'ь', 'β'],
                'c': ['©', '∁', '⊂', '☪', '¢'],
                'd': ['∂', '⫒', 'ძ'],
                'e': ['ℇ', '℮', '∃', '∈', '∑', '⋿', '€', 'ϱ'],
                'f': ['⨍', '⨗', '⫭', '៛', 'ϝ', '𐅿'],
                'g': ['₲', 'ց', 'Ԍ'],
                'h': ['ℏ', '⫲', '⫳', '♓︎', '₶'],
                'i': ['ℹ︎', '⫯', 'ι', 'ї'],
                'j': ['⌡', 'ϳ', 'ј'],
                'k': ['₭', 'κ', 'Ϗ'],
                'l': ['∟', '₤', 'լ'],
                'm': ['≞', '⋔', '⨇', '⩋', '⫙', '♏︎', '₥'],
                'n': ['∏', '∩', 'η'],
                'o': ['º', '⦿', '☉', 'ο', 'օ'],
                'p': ['℗', '♇', '₱', 'ρ', 'բ'],
                'q': ['ԛ', 'զ', 'գ', '৭', 'ҩ'],
                'r': ['®', 'Я', 'Ւ', '𐅾'],
                's': ['∫', '$', 'ѕ'],
                't': ['⊺', '⟙', '✝', '♱', '♰', 'τ', 'է'],
                'u': ['µ', '∪', '∐', '⨃'],
                'v': ['∨', '√', '⩔', '♈︎'],
                'w': ['⨈', '⩊', '⫝', '₩', 'ω'],
                'x': ['×', '⨯', '☓', '✗'],
                'y': ['¥', '⑂', 'Ⴤ', 'ӱ'],
                'z': ['Ꙁ', 'Ⴠ', 'Հ'],
        }

        var DECRYPTION_MAP = {}

        _.mapObject(ENCRPYTION_MAP, function(val, key) {
                _.each(val, function(element) {
                        DECRYPTION_MAP[element] = key;
                });
        });


        function unicodeEncrypt(input) {
                return _.map(Array.from(input.toLowerCase()), function(letter) {
                        var choices = ENCRPYTION_MAP[letter];
                        if (choices) {
                                return choices[_.random(choices.length-1)];
                        }
                        return letter;
                }).join('')
        }

        function unicodeDecrypt(input) {
                return _.map(Array.from(input), function(letter) {
                        var decrypt = DECRYPTION_MAP[letter];
                        if (decrypt) {
                                return decrypt;
                        }
                        return letter;
                }).join('')
        }

        $('#input-form input[name="main"]').on('input', function() {
                var input = $('#input-form input[name="main"]').val();
                var decrypt = unicodeDecrypt(input);
                $('#input-form input[name="main"]').val(unicodeEncrypt(decrypt));
        });
        

        $('#input-form').submit(function(event) {
                event.preventDefault();

                var input = $('#input-form input[name="main"]').val();
                $('#output').text(unicodeEncrypt(input));
        });

        var i = 0;
        window.setInterval(function() {
                var input = $('#content').text();
                var current = unicodeDecrypt(input.slice(i, i+1));
                $('#content').text(input.slice(0, i) + unicodeEncrypt(current) + input.slice(i+1));
                i++;

                // reset end to start encrypting the string again
                if (i >= input.length) {
                        i = 0;
                }
        }, 700);
})();