// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

console.log(solution([]));
function solution(A) {
    A.sort(function (a, b) {
        return a - b
    });
    var i = 0;
    var minSum = 9999999;
    while (1) {
        if (i === A.length) {
            break;
        }
        if (i === 0) {
            i++;
            continue;
        } else {
            if ((A[i] - A[i - 1]) < minSum) {
                minSum = A[i] - A[i - 1];
            }
        }
        i++;
    }
    return minSum;
}
