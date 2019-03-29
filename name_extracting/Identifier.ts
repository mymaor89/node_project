export enum IdentifierType  {
    Variable,
    Function,
    Class,
    Parameter,
    Method,
    Property
}

export class Identifier {
    readonly name: string
    readonly type: IdentifierType //TODO use esprima types

    constructor(name: string, type: IdentifierType) {
        this.name = name
        this.type = type
    }

    get hasName() :boolean {
        return this.name && this.name.length > 0     
    }
    
    static fromClass(name : string) :Identifier {
        return new this(name, IdentifierType.Class)
    }

    static fromFunction(name : string) {
        return new this(name, IdentifierType.Function)
    }
    
    static fromParameter(name: string) {
       return new this(name, IdentifierType.Parameter)
    }
    
    static fromMethod(name: string) {
        return new this(name, IdentifierType.Method)
    }
    static fromVariable(name: string) {
        return new this(name, IdentifierType.Variable)
    }
    
}
