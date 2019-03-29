import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier';

export class Variable extends Rules {
    conforms(): boolean {
        return this.node.type === 'VariableDeclaration';
    }
    
    handle(): Identifier | Identifier[] {
        return this.node.declarations.map(declaration => new Identifier(
            declaration.id.name,
            this.identifierType(declaration)
        ))
    }

    protected identifierType(declaration): IdentifierType {
        
        return declaration.init.type === 'FunctionExpression'
            ? IdentifierType.Function
            : IdentifierType.Variable
    }

}