import { Rules } from './Rules'
import { Identifier, IdentifierType } from '../Identifier'
import { FunctionDeclaration, Expression, Statement } from 'estree';

//function f(){}
export class Function extends Rules {
    handle(): Identifier | Identifier[] {
        let identifiers: Identifier[] = []
        if ((this.node as FunctionDeclaration).params.length != 0) {
            (this.node as FunctionDeclaration).params.forEach((param) => {
                if ('name' in param)
                    identifiers.push(Identifier.fromParameter(param.name))
            })
            identifiers.push(Identifier.fromFunction((this.node as FunctionDeclaration).id.name))
            return identifiers
        }
        else {
            return Identifier.fromFunction((this.node as FunctionDeclaration).id.name)
        }

    }
}