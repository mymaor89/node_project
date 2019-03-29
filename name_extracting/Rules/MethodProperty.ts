import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier';

export class MethodProperty extends Rules {

    conforms(): boolean {
        return this.node.type === 'AssignmentExpression'
        && this.node.left.type === 'MemberExpression'
        && this.node.right.type === 'FunctionExpression'
    }
 
    handle(): Identifier | Identifier[] {
        // Syntax B: person.name = function () {}
        return Identifier.fromMethod(this.node.left.property.name)

    }

}