//Reverses input ********************************
function printReverse(arr) {
    for(var i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}
printReverse([1,2,3,4,5]);

//checks whether all input equal ****************
function isUniform(arr) {
    var first = arr[0];
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] !== first) {
            return false;
        }
    }
    return true;
}
isUniform([1,2,2,3,1,1,1]);

//sums up all numbers in array********************

}
sumArray([2,3,2,3,4]);

//finds max number in array***********************
function max(arr) {

}
max([2,5,1,6,9,3]);