import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier';
export class PropertySemicolon extends Rules {

    private static isfuncOrArrowfunc(element :any) :boolean {
        return element === 'FunctionExpression' || element === 'ArrowFunctionExpression'
    }

    handle(): Identifier | Identifier[] {
        if (!PropertySemicolon.isfuncOrArrowfunc(this.node.value)) {
            if (this.node.key.hasOwnProperty('name')) {
                return new Identifier(this.node.key.name, IdentifierType.Property);
            }
            else if (this.node.key.hasOwnProperty('raw')) {
                return new Identifier(String(this.node.key.raw).replace(/'/g, ''), IdentifierType.Property);
            }
        }
    }

    conforms(): boolean {
        // to catch :  firstName: "John"
        return this.node.type === 'Property'
    }
    

}