import { Rules } from './Rules'
import { Identifier } from '../Identifier';
import { ExpressionStatement, AssignmentExpression } from 'estree';
import { MemberExpression } from '@babel/types';

export class MethodExpression extends Rules {
    protected conforms(): boolean {

        /*
        X= {}
        X.someMethod= function(){
             console.log('someMethod')
        }
        X.someMethod()
        */
        
        return this.node.type === 'ExpressionStatement'
            && this.node.expression.type === 'AssignmentExpression'
            && this.node.expression.left.type === 'MemberExpression'
            && this.node.expression.right.type === 'FunctionExpression'

    }


    handle(): Identifier | Identifier[] {
        let assignment : AssignmentExpression=((this.node as ExpressionStatement).expression) as AssignmentExpression
        return Identifier.fromMethod((assignment.left as unknown  as MemberExpression).property.name)
    }

}