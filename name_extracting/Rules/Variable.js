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
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    function Variable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Variable.prototype.conforms = function () {
        return this.node.type === 'VariableDeclaration';
    };
    Variable.prototype.handle = function () {
        var _this = this;
        return this.node.declarations.map(function (declaration) { return new Identifier_1.Identifier(declaration.id.name, _this.identifierType(declaration)); });
    };
    Variable.prototype.identifierType = function (declaration) {
        return declaration.init === 'FunctionDeclaration'
            ? Identifier_1.IdentifierType.Function
            : Identifier_1.IdentifierType.Variable;
    };
    return Variable;
}(Rules_1.Rules));
exports.Variable = Variable;
