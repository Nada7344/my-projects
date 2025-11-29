    
var findKthPositive = function(arr, k) {
    let missing =[];
    let ele=0;
    while ((missing.length-1)!==k) {
                
      if(!arr.includes(++ele)){
        missing.push(ele);
      }
        
    }
    return missing[k-1];
};
let arr = [2,3,4,7,11];
   

let k = 5;
console.log(findKthPositive(arr,k));
/*Input: arr = [1,2,3,4], k = 2

Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6. */