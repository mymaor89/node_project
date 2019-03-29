"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdentifierBag_1 = require("./IdentifierBag");
var Variable_1 = require("./Rules/Variable");
var fs = require("fs");
var esprima = require("esprima");
var PropertyAsignment_1 = require("./Rules/PropertyAsignment");
var PropertySemicolon_1 = require("./Rules/PropertySemicolon");
var MethodProperty_1 = require("./Rules/MethodProperty");
var MethodExpression_1 = require("./Rules/MethodExpression");
var Class_1 = require("./Rules/Class");
var Tree = /** @class */ (function () {
    function Tree(file) {
        this.rules = [MethodExpression_1.MethodExpression, Variable_1.Variable, Class_1.Class,
            MethodProperty_1.MethodProperty, PropertyAsignment_1.PropertyAsignment, PropertySemicolon_1.PropertySemicolon]; //Function
        var code = fs.readFileSync(file, 'utf-8');
        console.log(code);
        this.root = esprima.parseModule(code);
    }
    Tree.prototype.collect = function () {
        return this.traverse(this.root, new IdentifierBag_1.IdentifierBag());
    };
    Tree.prototype.extractNode = function (node) {
        return this.rules
            .map(function (rule) { return new rule(node); })
            .map(function (rule) { return rule.extract(); });
        //.filter()
    };
    Tree.prototype.traverse = function (node, bag) {
        var _this = this;
        bag.append(this.extractNode(node));
        for (var key in node) { //iterate on root propreties
            var child = node[key]; //child= prorety
            if (typeof child === 'object' && child !== null) { //if property is object
                if (Array.isArray(child)) {
                    child.forEach(function (node) { return _this.traverse(node, bag); });
                }
                else {
                    this.traverse(child, bag);
                }
            }
        }
        return bag;
    };
    return Tree;
}());
exports.Tree = Tree;
