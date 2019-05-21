// import { Tree } from "./Tree";

// const path = "../tests/resources/fake-file.js"
// var tree = new Tree(path)
// console.log(tree.collect())

import * as esprima from 'esprima'

esprima.parseModule(`function h(){}
var x= 4
var ob = {

h(){}
 
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// expected output: "Eagle"
`, null, (node, meta) => {
        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(function (dec) {
                console.log('type: ' + dec.init.type)
                if ('name' in dec.id) {
                    console.log('name: ' + dec.id.name + '\n')
                }

                if (dec.init.type === 'ObjectExpression') {
                    dec.init.properties.forEach((objprop) => {
                        if ('value' in objprop) {
                            console.log('type: '+ objprop.value.type)
                        }
                        if ('name' in objprop.key) {
                            console.log('name: ' + objprop.key.name+ '\n')
                        }
                    })
                }
            })
        }
    })