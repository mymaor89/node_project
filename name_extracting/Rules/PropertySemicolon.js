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
var PropertySemicolon = /** @class */ (function (_super) {
    __extends(PropertySemicolon, _super);
    function PropertySemicolon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertySemicolon.isfuncOrArrowfunc = function (element) {
        return element === 'FunctionExpression' || element === 'ArrowFunctionExpression';
    };
    PropertySemicolon.prototype.handle = function () {
        if (!PropertySemicolon.isfuncOrArrowfunc(this.node.value)) {
            if (this.node.key.hasOwnProperty('name')) {
                return new Identifier_1.Identifier(this.node.key.name, Identifier_1.IdentifierType.Property);
            }
            else if (this.node.key.hasOwnProperty('raw')) {
                return new Identifier_1.Identifier(String(this.node.key.raw).replace(/'/g, ''), Identifier_1.IdentifierType.Property);
            }
        }
    };
    PropertySemicolon.prototype.conforms = function () {
        // to catch :  firstName: "John"
        return this.node.type === 'Property';
    };
    return PropertySemicolon;
}(Rules_1.Rules));
exports.PropertySemicolon = PropertySemicolon;
