var no01 = 10;
var no02 = 100;

var sum01 = function(){
    console.log("drop unreferenced function");
}

var sum02 = function(){
    var sum = 0;
    for(var i = 0; i <= no02; i++){
        sum += i;
    }

    return sum02;
}

no02 = no02 * 100;
console.log(sum02());
