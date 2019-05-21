/*import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier';
export class PropertyAsignment extends Rules {


    handle(): Identifier | Identifier[] {
        return new Identifier(this.node.right.name, IdentifierType.Property);
    }

    conforms(): boolean {
        // to catch : this.height = height;
        return (this.node.type == 'AssignmentExpression'
            && this.node.left.type == 'MemberExpression'
            && this.node.right.type == 'Identifier')
    }
  
}
    */