let input = require('fs').readFileSync('/dev/stdin').toString();

let star = "";

for (let i = 0; i < input; i++) {
  star += "*"
  console.log(star); 
}