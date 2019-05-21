/*import { Rules } from './Rules'
import { Identifier } from '../Identifier';
import {ExpressionStatement,AssignmentExpression,ObjectExpression} from "estree";
export class ObjectLiteral extends Rules {

    protected conforms(): boolean {

            if (this.node.type === 'ExpressionStatement') {
                if (this.node.expression.type === 'AssignmentExpression') {
                    return this.node.expression.right.type === 'ObjectExpression'
                }
            }

        return false
    }

    handle(): Identifier | Identifier[] {
        let identifiers: Identifier[] | false = []
        //iterate over object literal properties
        const props = this.node.right.properties
        if (props.length != 0){
            for (let prop of props) {

                if (prop.value.type === 'Literal') {
                    identifiers.push(Identifier.fromProperty(prop.key.name))
                }

                else if (prop.value.type === 'FunctionExpression') {
                    identifiers.push(Identifier.fromFunction(prop.key.name))
                }

                else if (prop.value.type === 'ArrowFunctionExpression') {
                    identifiers.push(Identifier.fromArrowFunction(prop.key.name))
                }
            }
            identifiers.push(Identifier.fromObjectLiteral(this.node.expression.left.name))
            return identifiers
        }
    }
}*/