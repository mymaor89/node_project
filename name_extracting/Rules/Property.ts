import {Rules} from './Rules'
import { Identifier, IdentifierType } from '../Identifier';
export class Property extends Rules {
    

    handle(node: any): Identifier | Identifier[] {
       if(this.style === 1)
    }
    protected conforms(node) : boolean {
        // to catch : this.height = height;
    if (node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression' 
    && node.right.type == 'Identifier'){
    bag.append(new Identifier('Property',node.right.name));
}
// to catch :  firstName: "John"
if (typeChecks.isProperty(node)){
    if (!isfuncOrArrowfunc(node.value)){
        if(node.key.hasOwnProperty('name')){
             bag.append(new Identifier('Property',node.key.name));
        }
        else if(node.key.hasOwnProperty('raw')){
            bag.append(new Identifier('Property',String(node.key.raw).replace(/'/g,'')));
       }

       
    }
}
    }
    
}