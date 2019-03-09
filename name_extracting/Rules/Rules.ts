import { Identifier } from "../Identifier";

export abstract class Rules{
    protected declaration = `${this.constructor.name}Declaration`

    protected conforms(node) : boolean {
        return node.type === this.declaration
    }

    abstract handle(node) : Identifier | Identifier[]

    extract (node){
        if (this.conforms(node)){
            this.handle(node)
        }
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
    static isProperty(node):boolean {
        return node.type == 'Property';
    }
    static isArrayDecleration(variableDecleration) : boolean{
        return variableDecleration.init.type == 'ArrayExpression';
    }
    static isObjectLiteral(variableDecleration): boolean {
        return variableDecleration.init.type == 'ObjectExpression';
    }
    static isMethod (node) : boolean{
        return this.isProperty(node) && 
        (this.isFunctionExpression(node.value) ||
            this.isArrowFunctionExpression(node.value));
    }
*/
}
