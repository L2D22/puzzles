// STRING MANIPULATIONS

export function manipulateStr() {
    var str = 'breakfast, lunch, dinner';
    // Return length of string str
    console.log('str.length', str.length);
    // Return nth character of string str
    console.log('str[n]', str[4]);
    // Return character in string str at specified index
    console.log('str.charAt(1)', str.charAt(1));
    // Convert string str to lower case
    console.log('str.toLowerCase()', str.toLowerCase());
    // Convert string str to upper case
    console.log('str.toUpperCase()', str.toUpperCase());
    // Return first index within string str of substring substr
    console.log('str.indexOf(substr)', str.indexOf('lunch'));
    // Split string str into an array of substrings separated by param separator
    console.log('str.split(separator)', str.split(','));

    // Trim whitespace from beginning and end of string str
    console.log('str.trim()', str.trim());
    // Return true if str1 is less than str2
    var str1 = 'boom';
    var str2 = 'boomy';
    console.log('str1 < str2', str1 < str2);
    // return true if str1 is greater than str2
    console.log('str1 > str2', str1 > str2);
    // Return true if str2 is found in string str1
    console.log('str1.includes(str2)', str1.includes(str2));
    // Return true if string str1 ends with string str2
    console.log('str1.endsWith(str2)', str1.endsWith(str2));
    // Return string repeated int times of string str
    console.log('str.repeat(int)', str.repeat(5));
    // Return true if string str1 starts with str2
    console.log('str1.startsWith(str2) ', str1.startsWith(str2) );
    // Combine text of strings str1 and str2 and return a new string
    console.log('str1.concat(str2)', str1.concat(str2));
    // Return last index within string str of substring substr
    console.log('str.lastIndexOf(substr)', str.lastIndexOf('dinner'));
    // Extract a section of string str from start to end
    console.log('str.slice(start, end)', str.slice(0, 5));
    // Return characters in string str from start having length length
    console.log('str.substr(start, length)', str.substr(0, 5));
    // Return subset of string str between index1 and index2
    console.log('str.substring(index1, index2)', str.substring(5, 10));
    // Trim whitespace from left side of string str
    console.log('str.trimLeft()', str.trimLeft());
    // Trim whitespace form right side of string str
    console.log('str.trimRight()', str.trimRight());
    // Match a regular expression regexp against string str
    var regexp = /[,]/;
    console.log('str.match(regexp)', str.match(regexp));
    // Replace matched regexp elements in string str1 with string str2
    console.log('str1.replace(regexp, str2) ', str1.replace(regexp, str2) );
    console.log('str.search(regexp)', str.search(regexp));

}

manipulateStr();
