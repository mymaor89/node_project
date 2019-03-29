export class IdentifierBag{
    protected bag: any[]
    
    constructor() {
            this.bag = [];
        }

    append(identifer) {
        this.bag.push(identifer);
    }
}