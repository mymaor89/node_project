const functions = require('./jest_tutorial');
const extract = require('./../name_extracting/extract');
var fs = require('fs'),
    esprima = require('esprima');

test('check not contain undefined',()=>{
    expect(functions.isNull()).not.toContain(undefined);
});

test('check Variable decleration',()=>{
    const node= esprima.parseScript("var x=3;").body[0];
    expect(extract.isVar(node)).toBe(true);
});
