const calculator = require('kickscar-calculate');

const tokens = process.argv.slice(2);
const result = calculator.run(tokens[0], tokens.slice(1).map(function(s){ 
    return parseInt(s, 10); 
}));

console.log(result || 'undefined function');
