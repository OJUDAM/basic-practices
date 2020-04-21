const kickscarMath = require('kickscar-math');

exports.run = function(functionName, numbers){
    if(numbers.length != 2){
        return 'only 2 numbers supported!!';
    }    
    return kickscarMath[functionName] && kickscarMath[functionName].apply(this, numbers);
}
