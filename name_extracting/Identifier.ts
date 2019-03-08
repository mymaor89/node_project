export enum IdentifierType  {
    Variable,
    Function,
    Class,
}

export class Identifier {
    protected name: string
    protected type: IdentifierType //TODO use esprima types

    constructor(name: string, type: IdentifierType) {
        this.name = name
        this.type = type
    }

    getName() : string {
        return this.name;
    }
    
    getType() : IdentifierType{
        return this.type;
    }

    static fromClass(name :string){
        return new this(name, IdentifierType.Class)
    }
}
