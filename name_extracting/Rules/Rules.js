"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rules = /** @class */ (function () {
    function Rules(node) {
        this.declaration = this.constructor.name + "Declaration"; //Template literal (ES6)
        this.node = node;
    }
    Rules.prototype.conforms = function () {
        return this.node.type === this.declaration;
    };
    Rules.prototype.extract = function () {
        if (this.conforms())
            return this.handle();
        else
            return null;
    };
    return Rules;
}());
exports.Rules = Rules;
