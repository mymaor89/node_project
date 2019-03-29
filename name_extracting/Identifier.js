"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdentifierType;
(function (IdentifierType) {
    IdentifierType[IdentifierType["Variable"] = 0] = "Variable";
    IdentifierType[IdentifierType["Function"] = 1] = "Function";
    IdentifierType[IdentifierType["Class"] = 2] = "Class";
    IdentifierType[IdentifierType["Parameter"] = 3] = "Parameter";
    IdentifierType[IdentifierType["Method"] = 4] = "Method";
    IdentifierType[IdentifierType["Property"] = 5] = "Property";
})(IdentifierType = exports.IdentifierType || (exports.IdentifierType = {}));
var Identifier = /** @class */ (function () {
    function Identifier(name, type) {
        this.name = name;
        this.type = type;
    }
    Object.defineProperty(Identifier.prototype, "hasName", {
        get: function () {
            return this.name && this.name.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Identifier.fromClass = function (name) {
        return new this(name, IdentifierType.Class);
    };
    Identifier.fromFunction = function (name) {
        return new this(name, IdentifierType.Function);
    };
    Identifier.fromParameter = function (name) {
        return new this(name, IdentifierType.Parameter);
    };
    Identifier.fromMethod = function (name) {
        return new this(name, IdentifierType.Method);
    };
    return Identifier;
}());
exports.Identifier = Identifier;
