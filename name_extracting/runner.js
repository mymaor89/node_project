"use strict";
// import { Tree } from "./Tree";
exports.__esModule = true;
// const path = "../tests/resources/fake-file.js"
// var tree = new Tree(path)
// console.log(tree.collect())
var esprima = require("esprima");
esprima.parseModule("function h(){}\nvar x= 4\nvar ob = {\n\nh(){}\n \n}\n\nfunction Car(make, model, year) {\n  this.make = make;\n  this.model = model;\n  this.year = year;\n}\n\nvar car1 = new Car('Eagle', 'Talon TSi', 1993);\n\nconsole.log(car1.make);\n// expected output: \"Eagle\"\n", null, function (node, meta) {
    if (node.type === 'VariableDeclaration') {
        node.declarations.forEach(function (dec) {
            console.log('type: ' + dec.init.type);
            if ('name' in dec.id) {
                console.log('name: ' + dec.id.name + '\n');
            }
            if (dec.init.type === 'ObjectExpression') {
                dec.init.properties.forEach(function (objprop) {
                    if ('value' in objprop) {
                        console.log('type: ' + objprop.value.type);
                    }
                    if ('name' in objprop.key) {
                        console.log('name: ' + objprop.key.name + '\n');
                    }
                });
            }
        });
    }
});
