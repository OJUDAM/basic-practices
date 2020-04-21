const kickscarMath = require('kickscar-math');

exports.run = function(functionName, numbers){
    return kickscarMath[functionName] && kickscarMath[functionName].apply(this, numbers);
}