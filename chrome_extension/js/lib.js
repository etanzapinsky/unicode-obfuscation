var OBFUSCATION_MAP = {
        'a': ['ª', '∀', '⟑', 'α', '@'],
        'b': ['฿', 'В', 'ь', 'β'],
        'c': ['©', '∁', '⊂', '¢'],
        'd': ['∂', '⫒', 'ძ'],
        'e': ['ℇ', '℮', '∃', '∈', '∑', '⋿', '€', 'ϱ'],
        'f': ['⨍', '⨗', '⫭', '៛', 'ϝ', '𐅿'],
        'g': ['₲', 'ց', 'Ԍ'],
        'h': ['ℏ', '⫲', '⫳', '₶'],
        'i': ['ℹ︎', '⫯', 'ι', 'ї'],
        'j': ['⌡', 'ϳ', 'ј'],
        'k': ['₭', 'κ', 'Ϗ'],
        'l': ['∟', '₤', 'լ'],
        'm': ['≞', '⋔', '⨇', '⩋', '⫙', '₥'],
        'n': ['∏', '∩', 'η'],
        'o': ['º', '⦿', '☉', 'ο', 'օ'],
        'p': ['℗', '♇', '₱', 'ρ', 'բ'],
        'q': ['ԛ', 'զ', 'գ', '৭', 'ҩ'],
        'r': ['®', 'Я', 'Ւ', '𐅾'],
        's': ['∫', '$', 'ѕ'],
        't': ['⊺', '⟙', '♱', '♰', 'τ', 'է'],
        'u': ['µ', '∪', '∐', '⨃'],
        'v': ['∨', '√', '⩔'],
        'w': ['⨈', '⩊', '⫝', '₩', 'ω'],
        'x': ['×', '⨯', '☓', '✗'],
        'y': ['¥', '⑂', 'Ⴤ', 'ӱ'],
        'z': ['Ꙁ', 'Ⴠ', 'Հ'],
}

var DEOBFUSCATION_MAP = {}

_.mapObject(OBFUSCATION_MAP, function(val, key) {
        _.each(val, function(element) {
                DEOBFUSCATION_MAP[element] = key;
        });
});

var splitter = new GraphemeSplitter();

function unicodeObfuscate(input) {
        if (!input) {
                return '';
        }
        
        return _.map(splitter.splitGraphemes(input.toLowerCase()), function(letter) {
                var choices = OBFUSCATION_MAP[letter];
                if (choices) {
                        return choices[_.random(choices.length-1)];
                }
                return letter;
        }).join('')
}

function unicodeDeobfuscate(input) {
        if (!input) {
                return '';
        }
        
        return _.map(splitter.splitGraphemes(input), function(letter) {
                var deobfuscate = DEOBFUSCATEION_MAP[letter];
                if (deobfuscate) {
                        return deobfuscate;
                }
                return letter;
        }).join('')
}
