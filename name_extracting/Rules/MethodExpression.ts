import { Rules } from './Rules'
import { Identifier} from '../Identifier';

export class MethodExpression extends Rules {
    //Syntax A: name = person.fullName();
    protected conforms(): boolean {
        const isFunction = this.node.value === 'FunctionExpression'
            || this.node.value === 'ArrowFunctionExpression'

        return this.node.type === 'Property' && isFunction
    }

 
    handle(): Identifier | Identifier[] {
        //Syntax A: name = person.fullName();
        return Identifier.fromMethod(this.node.key.name)

    }

}