// Two Sum
// Given an numsay of integers, return indices of
// the two numbers such that they add up to a specific target.
//
// You may assume that each input would have exactly one solution,
// and you may not use the same element twice.
//
// Example:
//
// Given twoSum(9, [2, 7, 11, 15])
//
// nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1]

export function twoSum(target, nums) {
      let sum = 0;
      let indices = [];
      for (var i = 0; i < nums.length - 1; i++) {
          if(target === nums[i]) {
            indices.push(i);
            return indices;
          }
          // Add up targets
          sum += nums[i];
          indices.push(i);
          if (sum === target) {
              return indices;
          }
          else if (sum > target) {
              indices.pop();
              sum -= nums[i];
          }
      }
      // check all possible combinations of targets
      if (nums.slice(1).length > 1) {
          // return recursive functions otherwise results are undefined
          return twoSum(target, nums.slice(1));
      }
      else {
          return false;
      }
}

console.log('twoSum', twoSum(9, [2, 7, 11, 15]));

// const Mocha = require('mocha')
// const assert = require('assert')
// const chai = require('chai')
// const mocha = new Mocha()
//
// mocha.suite.emit('pre-require', this, 'solution', mocha)
//
// describe('Two sum', function() {
//   it('Gives correct indices', function() {
//     throw new Error()
//   })
// })
// mocha.run()
