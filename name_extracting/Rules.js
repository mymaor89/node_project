"use strict";
exports.__esModule = true;
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Rules.isVariableDeclaraction = function (node) {
        return node.type == 'VariableDeclaration';
    };
    Rules.isFunctionDeclaraction = function (node) {
        return node.type == 'FunctionDeclaration';
    };
    Rules.isFunctionExpression = function (node) {
        return node.type == 'FunctionExpression';
    };
    Rules.isArrowFunctionExpression = function (node) {
        return node.type == 'ArrowFunctionExpression';
    };
    Rules.isClassDeclaration = function (node) {
        return node.type == 'ClassDeclaration';
    };
    Rules.isProperty = function (node) {
        return node.type == 'Property';
    };
    Rules.isArrayDecleration = function (variableDecleration) {
        return variableDecleration.init.type == 'ArrayExpression';
    };
    Rules.isObjectLiteral = function (variableDecleration) {
        return variableDecleration.init.type == 'ObjectExpression';
    };
    Rules.isMethod = function (node) {
        return this.isProperty(node) &&
            (this.isFunctionExpression(node.value) ||
                this.isArrowFunctionExpression(node.value));
    };
    return Rules;
}());
exports.Rules = Rules;
