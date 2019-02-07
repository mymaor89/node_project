module.exports = class IdentifierBag{
    constructor (){
        this.bag = [];
    }

    append(identifer) {
        this.bag.push(identifer);
    }
}