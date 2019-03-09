import {Rules} from './Rules'
import { Identifier, IdentifierType } from '../Identifier';

export class Variable extends Rules{
    conforms(node):boolean {
        return node.type === 'VariableDeclaration';
    }

    // @FIXME 
    handle(node: any): Identifier | Identifier[] {
        
        //if (node.hasOwnProperty('declarations')){
        return node.declarations.map(declaration => new Identifier(
            declaration.id.name, 
            this.identifierType(declaration)
        ))
    }

    protected identifierType(declaration) : IdentifierType {
       return declaration.init === 'FunctionDeclaration'
                ? IdentifierType.Function
                : IdentifierType.Variable;
    }
        
}