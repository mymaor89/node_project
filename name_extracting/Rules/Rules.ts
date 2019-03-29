import { Identifier } from "../Identifier";

export abstract class Rules {

    protected readonly node: any

    constructor(node: any) {
        this.node = node
    }
    protected declaration = `${this.constructor.name}Declaration` //Template literal (ES6)

    protected conforms(): boolean {
        return this.node.type === this.declaration
    }

    abstract handle(): Identifier | Identifier[] 

    extract(): Identifier | Identifier[]| boolean {
        if (this.conforms())
            return this.handle()
        else
            return false

    }
    /*
    
     static isFunctionExpression(node):boolean {
         return node.type == 'FunctionExpression';
     }
    static isArrowFunctionExpression(node):boolean {
         return node.type == 'ArrowFunctionExpression';
     }
     static isClassDeclaration(node):boolean {
         return node.type == 'ClassDeclaration';
     }
    
     static isArrayDecleration(variableDecleration) : boolean{
         return variableDecleration.init.type == 'ArrayExpression';
     }
     static isObjectLiteral(variableDecleration): boolean {
         return variableDecleration.init.type == 'ObjectExpression';
     }
    
 */
}
