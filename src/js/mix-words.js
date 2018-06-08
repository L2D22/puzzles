function mixwords(str) {

  // check for sanitized data
  if (typeof str !== 'string') {
    return undefined;
  }

  // check string has enough letters
  if (str.length > 3) {
    var re = /(\w+)[a-zA-Z]{3}/g;
    //var re = /\B[a-z]+\B/g; matches word boundaries and chops off first and last letters

    // Match words
    var scrambleStr = str.replace(re, function(wordMatches) {
      // Word scramble
      var wordSplit = wordMatches.split('');
      var wordTrim = wordMatches.slice(1, wordMatches.length - 1);

      var wordChar = wordTrim.split('').sort(function() {
        return Math.random();
      }).join('');

      // Add first and last letters back in
      wordChar = wordSplit[0] + wordChar + wordSplit[wordSplit.length - 1];

      return wordChar;
    });

    return scrambleStr;
  }

  return str;
}

var simpleString = 'John';
var longString = 'Winter is coming';

var answer = mixwords(longString);
console.log('answer',answer);
