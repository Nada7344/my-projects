
//Assignment1

//Part 1: Coding Questions

//problem 1: -
let num = parseInt("123") + 7;
console.log(num, typeof (num));

//problem 2: -
function checkFalsyVar(v) {
    let result = !Boolean(v) ? "Invalid" : v;
    return result;
}
console.log(checkFalsyVar(0));

//without function
let v = 0;
let result1 = !Boolean(v) ? "Invalid" : v;
console.log(result1);

//problem 3: -
for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    console.log(i);

}

//problem 4: -
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let result2 = data.filter(function (ele) {
    return ele % 2 == 0;
})
console.log(result2);

//problem 5: -
let data1 = [1, 2, 3];
let data2 = [4, 5, 6];
let marged = [...data1, ...data2];
console.log(marged);

//problem 6: -
let day = 2;
switch (day) {
    case 1: console.log("sunday");
        break;
    case 1: console.log("sunday");
        break;
    case 2: console.log("monday");
        break;
    case 3: console.log("Tuesday");
        break;
    case 4: console.log(" Wednesday");
        break;
    case 5: console.log("Thursday");
        break;
    case 6: console.log("Friday");
        break;
    case 7: console.log("Saturday");
        break;

    default: console.log("invalid day number");
        break;
}

//problem 7: -
let data3 = ["ab", "abc", "abcd", "h"];
let result = data3.map(function (ele, index, arr) {
    return ele.length;
});
console.log(result);


//problem 8: -
function checkDivisiblity(num) {
    if (num % 3 == 0 && num % 5 == 0) {
        console.log("“Divisible by both”");

    } else {
        console.log("“ the number is not divisible 3 and 5”");
    }
}
checkDivisiblity(15);

//problem 9: -
const sqr = (num) => {
    return num ** 2;
};
console.log(sqr(5));

//problem 10: -
function destructObj(user) {
    let userINFO = `${user.name} is ${user.age} years old`;
    return userINFO;
}
const person = { name: 'John', age: 25 }
console.log(destructObj(person));

//problem 11: -
function sumNumbers(...data) {
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
        sum += data[index];

    }
    return sum;
}
console.log(sumNumbers(20, 40, 30, 10));

//problem 12: -
function printSuccess() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000);
    });
}
printSuccess().then(message => {
    console.log(message); // Success (after 3 seconds)
});

//problem 13: -
let maxNumber = function (arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }

    }
    return max;
}
let arr = [1, 3, 7, 2, 4];
console.log(maxNumber(arr));

//problem 14: -
let objKeys = function (data) {
    return Object.keys(data);
}
let user = { name: "John", age: 30 }
console.log(objKeys(user));

//problem 15: -
function splitToWorde(S) {
    return S.split(" ")
}
let text = "The quick brown fox";
console.log(splitToWorde(text));

//Part 2: Essay Questions:-
/*
1- What is the difference between forEach and for...of? When would you use each?
Answer:
1-The forEach method is an array method that executes a provided callback function once for each array element
- we cant use break or continue to control loop
- use it when we want to apply a function to every element in an array.
2-The forof loop allows iteration over iterable objects (arrays/ strings/ Sets) allows early termination of the loop.
-we can control the loop using break and continue.
-use it when we need more control over the loop and when we working with async/await.



2-What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.

-Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation, before the code executes.
ex: variables declared with var keyword are hoisted
-The Temporal Dead Zone refers to the period between the entering of a scope and the actual declaration of a variable using let or const. During this period, the variable is in an "uninitialized" state and accessing it will result in a ReferenceError.
ex :console.log(b); 
let b = 10;


3-What are the main differences between == and ===?
(==)compares values only
(===) compares data type and value


4-Explain how try-catch works and why it is important in async operations.
-try-catch is used to handle errors in JavaScript, The try block contains code that may throw an error.
The catch block runs if an error occurs, allowing the program to handle it without crashing.
-When using async/await, try-catch handles rejected promises or runtime errors



5-What’s the difference between type conversion and coercion? Provide examples of each.
-type conversion:- It happens when we convert a data type to another by ourselves
ex :- let x= "5";
        x= Number(x);
 -type coercion :-  js automatically converts types during operations.
 ex :- console.log(5+"5");//55
*/
