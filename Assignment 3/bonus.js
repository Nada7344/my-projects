var majorityElement = function(nums) {
        let count=0;
        let n=(nums.length/2)
        
        
        for (let i = 0; i < nums.length; i++) {
          count=0;
          for (let j = 0; j < nums.length; j++) {
          if(nums[i]==nums[j]){
            count++;
          }
            
          }
          if (count>=n) {
            return nums[i]; 
          }
            
        }
       
  
};
 console.log(majorityElement([6,5,5]));
 