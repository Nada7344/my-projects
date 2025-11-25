var createCounter = function(init) {
    let rest=init;
    return {
    increment:()=>++init
       ,
    reset:()=> {
        init=rest;
        return init;
    },
    decrement:()=>--init,
    };
};


  const counter = createCounter(5)
  console.log(counter.increment()); // 6
  console.log(counter.reset()); // 5
  console.log(counter.decrement()); // 4
