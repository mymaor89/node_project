const functions = require('./jest_tutorial');
const extract = require('./../name_extracting/extract');
var fs = require('fs'),
    esprima = require('esprima');
test('adds 2+2 to equal 4', ()=> {
    expect(functions.add(2,2)).toBe(4);
});

test('check not contain undefined',()=>{
    expect(functions.isNull()).not.toContain(undefined);
});

test('check Variable decleration',()=>{
    const node= esprima.parseScript("var x=3;").body[0];
    expect(extract.isVariableDecleration(node)).toBe(true);
});