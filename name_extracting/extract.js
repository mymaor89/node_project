// we've found anormalization of method decleration in js (2 type of syntax)

var fs = require('fs'),
    esprima = require('esprima');
var IdentifierBag = require('./IdentifierBag');
var Identifier = require('./Identifier');
var bag = new IdentifierBag();
var typeChecks = require('./Rules')

const funcArr = [pushVariableNames,pushParameterNames,pushClassNames
        ,pushMethodNames,pushFunctionNames,pushPropertyNames];
var isVar = typeChecks.isVariableDeclaraction;

var analyzeCode = function(code) {
    var ast = esprima.parse(code);
    traverse(ast,funcArr);
   
}
// var x = function(){} or var x = 0
function pushVariableNames(node){
    if (isVar(node)){
        if (node.hasOwnProperty('declarations')){
        node.declarations.forEach(declaration => {
            if(typeChecks.isFunctionExpression(declaration.init)){
                bag.append(new Identifier('Function',declaration.id.name));
            }else{
                bag.append(new Identifier('Variable',declaration.id.name));
            }
        });
    }
       
   }
}
function pushParameterNames(node){
    if (typeChecks.isFunctionDeclaraction(node) || typeChecks.isFunctionExpression(node)){
        node.params.forEach(element => {
            bag.append(new Identifier('Parameter',element.name));
        });
        
    }
}

function pushClassNames(node){
    if (typeChecks.isClassDeclaration(node)){
       bag.append(new Identifier('Class',node.id.name));
   }
}
function pushMethodNames(node){
    //Sytax A: name = person.fullName();
    if (typeChecks.isMethod(node)){
        bag.append(new Identifier('Method',node.key.name));
   }
   // Syntax B: person.name = function () {}
   if (node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression' 
        && node.right.type == 'FunctionExpression'){
        bag.append(new Identifier('Method',node.left.property.name));
    }
}
function pushFunctionNames(node){
    if (typeChecks.isFunctionDeclaraction(node)){   
       bag.append(new Identifier('Function',node.id.name));
    }
}
function pushPropertyNames(node){
    // to catch : this.height = height;
    if (node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression' 
        && node.right.type == 'Identifier'){
        bag.append(new Identifier('Property',node.right.name));
    }
    // to catch :  firstName: "John"
    if (typeChecks.isProperty(node)){
        if (!funcExp.includes(node.value.type)){
            if(node.key.hasOwnProperty('name')){
                 bag.append(new Identifier('Property',node.key.name));
            }
            else if(node.key.hasOwnProperty('raw')){
                bag.append(new Identifier('Property',String(node.key.raw).replace(/'/g,'')));
           }

           
        }
   }
}
function traverse(node, funcArr) {
   funcArr.forEach(func => func(node))

    for (var key in node) { //iterate on root propreties
        if (node.hasOwnProperty(key)) { //if key is property of the root
            var child = node[key]; //child= prorety
            if (typeof child === 'object' && child !== null) { //if property is object
                if (Array.isArray(child)) { //child can be object or array
                    child.forEach(node => traverse(node, funcArr));
                } else {
                    traverse(child, funcArr); //6
                }
            }
        }
    }
}
/*
if (process.argv.length < 3) {
    console.log('Usage: extract.js demo_file.js');
    process.exit(1);
}

var filename = process.argv[2];
*/
var filename = './../name_extracting/demo_file.js'
console.log('Reading ' + filename);
var code = fs.readFileSync(filename, 'utf-8');
analyzeCode(code);
console.log(bag.bag);
console.log('Done');
