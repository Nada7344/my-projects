/*["flower",
    "flow",
    "flight"]
    
    mannkj
    aanjj
    yanhjj*/
    var longestCommonPrefix = function(strs) {
        let minWord=200;
        let min="";
        let perfix="";
    for (let i = 0; i< strs.length; i++) {
        let x=strs[i].length;
        if(x<minWord){
            minWord=x;
           min= strs[i];
        }
    }
    console.log(min);
    
  
       for (let j = 0; j< min.length; j++) {
        for (let k = 0; k< strs.length; k++) {
            if(!(strs[k][j]==min[j])){
               return perfix;
    }
   
    

    }
     perfix+=min[j];

    }
    return perfix

};
   console.log(longestCommonPrefix(["flower",
    "flow",
    "flight"]));
   