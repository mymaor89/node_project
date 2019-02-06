// we've found anormalization of method decleration in js (2 type of syntax)
// I consider property:function(){} as Method
// and also 
var fs = require('fs'),
    esprima = require('esprima');
const funcArr = [pushVariableNames,pushParameterNames,pushClassNames
        ,pushMethodNames,pushFunctionNames,pushPropertyNames];
const funcExp = ['FunctionExpression','ArrowFunctionExpression'];
const found = {
    variables: [],
    parameters: [],
    classes: [],
    methods: [],
    functions: [],
    properties: []
}
var analyzeCode = function(code) {
    var ast = esprima.parse(code);
    
    traverse(ast,funcArr);
    console.log(found);
    
    
}
exports.isVariableDecleration = function(node){
    return node.type == 'VariableDeclaration' ;
}
function pushVariableNames(node){
    if (node.type == 'VariableDeclaration' ){
        if (node.hasOwnProperty('declarations')){
        node.declarations.forEach(declaration => {
            if(declaration.init.type == 'FunctionExpression'){
                found.functions.push(declaration.id.name);
            }else{
                found.variables.push(declaration.id.name);
            }
        });
    }
       
   }
}
function pushParameterNames(node){
    if (node.type == 'FunctionDeclaration' || node.type =='FunctionExpression'){
        node.params.forEach(element => {
            found.parameters.push(element.name);
        });
        
    }
}

function pushClassNames(node){
    if (node.type == 'ClassDeclaration'){
       found.classes.push(node.id.name);
   }
}
function pushMethodNames(node){
    if (node.type == 'Property' && funcExp.includes(node.value.type)){
        found.methods.push(node.key.name);
   }
   // to include also this type:
   //  person.name = function () {
   //  return this.firstName + " " + this.lastName;
   //};
   if (node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression' 
        && node.right.type == 'FunctionExpression'){
        found.methods.push(node.left.property.name);
    }
}
function pushFunctionNames(node){
    if (node.type == 'FunctionDeclaration'){   
       found.functions.push(node.id.name);
    }
}
function pushPropertyNames(node){
    // to catch : this.height = height;
    if (node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression' 
        && node.right.type == 'Identifier'){
        found.properties.push(node.right.name);
    }
    // to catch :  firstName: "John"
    if (node.type == 'Property'){
        if (!funcExp.includes(node.value.type)){
            if(node.key.hasOwnProperty('name')){
                 found.properties.push(node.key.name);
            }
            else if(node.key.hasOwnProperty('raw')){
                found.properties.push(String(node.key.raw).replace(/'/g,''));
           }

           
        }
   }
}
function traverse(node, funcArr) {
   funcArr.forEach(func => func(node))

    for (var key in node) { //2
        if (node.hasOwnProperty(key)) { //3
            var child = node[key];
            if (typeof child === 'object' && child !== null) { //4

                if (Array.isArray(child)) {
                    child.forEach(node => traverse(node, funcArr));
                } else {
                    traverse(child, funcArr); //6
                }
            }
        }
    }
}
// 2
if (process.argv.length < 3) {
    console.log('Usage: extract.js demo_file.js');
    process.exit(1);
}

// 3
var filename = process.argv[2];
console.log('Reading ' + filename);
var code = fs.readFileSync(filename, 'utf-8');

analyzeCode(code);
console.log('Done');