(function() {
        ENCRPYTION_MAP = {
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


        function unicodeEncrypt(input) {
                return _.map(Array.from(input.toLowerCase()), function(letter) {
                        var choices = ENCRPYTION_MAP[letter];
                        if (choices) {
                                return choices[_.random(choices.length-1)];
                        }
                        return letter;
                }).join('')
        }

        

        $('#input-form').submit(function(event) {
                event.preventDefault();

                var input = $('#input-form input[name="main"]').val();
                $('#output').text(unicodeEncrypt(input));
        });

        

})();
