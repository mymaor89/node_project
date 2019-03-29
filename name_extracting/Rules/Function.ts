import {Rules} from './Rules'
import { Identifier, IdentifierType } from '../Identifier'

export class Function extends Rules {
    handle(): Identifier | Identifier[] {
        return this.node.params
            .map(({ name }) => Identifier.fromParameter(name))
            .concat(Identifier.fromFunction(this.node))
    }
}