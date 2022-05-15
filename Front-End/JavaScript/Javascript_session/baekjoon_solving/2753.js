let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

const A = Number(input[0]);

if ((A % 4 === 0 && A % 100 !== 0) || A % 400 === 0) {
  console.log("1");
} else {
  console.log("0");
}