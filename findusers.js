// given an array of values, write a function that finds the index of 
// where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

var fruits = ['apple', 'orange', 'pineapple', 'orange']

var find = fruits.indexOf('banana')
console.log(find)

// now, write a function that finds all the indexes of where the value is 
// located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

var fruits = ['apple', 'orange', 'pineapple', 'orange']

var indexes = fruits.reduce(function(a, e, i) {
    if (e === x) {
        a.push(i);
    return a;
    }
    else {
    return -1
    }
}, []);


/// or this one is more useful, where one can see the process and specify what you want in the end:

var fruits = ['apple', 'orange', 'orange', 'pineapple']

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){ //'indexof' wwill specify the location of the val, normally it only shows the first location but with the 'push' it adds the the second location 

        indexes.push(i); //'push' adds 1 in the loop
        console.log(indexes)
    } 

}

getAllIndexes(fruits, "banana");