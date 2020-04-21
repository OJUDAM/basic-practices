import Circle from "../libs/circle.js";

/**
 * Prints a circle.
 *
 * @param {Circle} circle
 */
const printCircle = function(circle) {
    /** @this {Circle} */
    function bound() { 
        console.log(this) 
    }
    
    bound.apply(circle)
}

export default printCircle;