function solution(N) {
    // write your code in JavaScript (Node.js 6.4.0)]
    var steps = 0;
    var curr = N;
    while (1) {
        if (curr === 1) {
            break;
        }
        if ((curr % 2) === 1) {
            curr = curr - 1;
        } else {
            curr = curr / 2;
        }
        steps++;
    }
    return steps;
}