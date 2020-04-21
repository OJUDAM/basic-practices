/*
exports.sum = function(){
	let sum = 0;
	Array.from(arguments).forEach(arg => {
		sum += arg;
	});
	return sum;
}
*/
exports.max = function(){
	let max = Number.MIN_SAFE_INTEGER;
	Array.from(arguments).forEach(arg => {
		if(arg > max){
			max = arg;
		}
	});
	return max;
}

exports.min = function(){
	let min = Number.MAX_SAFE_INTEGER;
	Array.from(arguments).forEach(arg => {
		if(arg < min){
			min = arg;
		}
	});
	return min;
}
