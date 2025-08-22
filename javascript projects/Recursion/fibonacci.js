function fibonacci(n) {
    if (n==0) return[];
    if (n==1) return [0];

    const result = [0, 1];

    for (let i =2; i<n; i++) {
        result.push(result[i-1]+ result[i-2]);
    }
    return result;
}

console.log("fibonacci with for-loop", fibonacci(8));

// recursion

function fibonacciRecursive(n) {
    console.log("this was printed recursively");

    if (n == 0) return[];
    if (n == 1) return [0];
    if (n == 2) return [0, 1];

    const prev = fibonacciRecursive(n - 1);
return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
}

console.log("fibonacci with recursion", fibonacciRecursive(8));

// merge sort

function mergeSort(arr) {
    if(arr.length <=1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort (arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

return result.concat (left, right);
}

console.log("merge sort 1:", mergeSort ([3,2,1,13,8,5,0,1]));
console.log("merge sort 2:", mergeSort ([105,79,100,110]));