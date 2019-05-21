import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier'
import { VariableDeclaration, VariableDeclarator } from 'estree';

export class Variable extends Rules {

    protected varDecs: VariableDeclarator[]
    
    conforms(): boolean {
       return this.node.type === 'VariableDeclaration'
    }
    
    handle(): Identifier | Identifier[] {
        this.varDecs = (this.node as VariableDeclaration).declarations
        let identifiers: Identifier[] = []
        this.varDecs.forEach((declaration) => {
            if ("name" in declaration.id) {
                identifiers.push(new Identifier(declaration.id.name,
                     this.identifierType(declaration)))
            }

        })
             return identifiers
    }

    protected identifierType(declaration: VariableDeclarator): IdentifierType {
        //var x= 3 , let x = 4 , const x = 4;
        if (declaration.init.type === 'Literal')
            return IdentifierType.Variable
        //let arr = [1,2,3]
        else if (declaration.init.type === 'ArrayExpression') {
            return IdentifierType.Array
        }
        //let y= function(){return true}
        else if (declaration.init.type === 'FunctionExpression') {
            return IdentifierType.Function
        }
             //let y= function(){return true}
        else if (declaration.init.type === 'ArrowFunctionExpression') {
            return IdentifierType.ArrowFunction
        }
        else if (declaration.init.type === 'ObjectExpression') {
            return IdentifierType.Object_Literal
        }
        else {
            return undefined
        }
            
    }

}