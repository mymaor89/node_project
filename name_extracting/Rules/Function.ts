import {Rules} from './Rules'
import { Identifier, IdentifierType } from '../Identifier';
export class Function extends Rules {
    handle(node: any): Identifier | Identifier[] {
        let list : Identifier[] = node.params.map(param => new Identifier(
            param.name, IdentifierType.Parameter
        ))
        list.push(Identifier.fromFunction(node));
        return list;
    }
}