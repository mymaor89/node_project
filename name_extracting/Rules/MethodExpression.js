"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rules_1 = require("./Rules");
var Identifier_1 = require("../Identifier");
var MethodExpression = /** @class */ (function (_super) {
    __extends(MethodExpression, _super);
    function MethodExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Syntax A: name = person.fullName();
    MethodExpression.prototype.conforms = function () {
        var isFunction = this.node.value === 'FunctionExpression'
            || this.node.value === 'ArrowFunctionExpression';
        return this.node.type === 'Property' && isFunction;
    };
    MethodExpression.prototype.handle = function () {
        //Syntax A: name = person.fullName();
        return Identifier_1.Identifier.fromMethod(this.node.key.name);
    };
    return MethodExpression;
}(Rules_1.Rules));
exports.MethodExpression = MethodExpression;
