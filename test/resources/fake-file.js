var person = {
    firstName: "moshe",
    lastName: "Cohen",
    fullName : function() {
        return this.firstName + " " + this.lastName;
      },
    age: 45,
    mammal : ()=> {
    	return true
    }
}
person.name = function () {}
var counter = function(arr){
    return 'there are '+ arr.length + ' elements in this array';
};
var adder  = function(a,b){
    return 'The sum of 2 numbers is ${a+b}';
};
var x = 10;
let j = 4;
const z = 32;
module.exports = counter;