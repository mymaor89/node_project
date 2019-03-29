"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdentifierBag = /** @class */ (function () {
    function IdentifierBag() {
        this.bag = [];
    }
    IdentifierBag.prototype.append = function (identifer) {
        this.bag.push(identifer);
    };
    return IdentifierBag;
}());
exports.IdentifierBag = IdentifierBag;
