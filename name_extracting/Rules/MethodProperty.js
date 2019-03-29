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
var MethodProperty = /** @class */ (function (_super) {
    __extends(MethodProperty, _super);
    function MethodProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MethodProperty.prototype.conforms = function () {
        return this.node.type === 'AssignmentExpression'
            && this.node.left.type === 'MemberExpression'
            && this.node.right.type === 'FunctionExpression';
    };
    MethodProperty.prototype.handle = function () {
        // Syntax B: person.name = function () {}
        return Identifier_1.Identifier.fromMethod(this.node.left.property.name);
    };
    return MethodProperty;
}(Rules_1.Rules));
exports.MethodProperty = MethodProperty;
