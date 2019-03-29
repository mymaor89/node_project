import {IdentifierBag} from './IdentifierBag'
import { Identifier } from './Identifier';
import {Rules} from './Rules/Rules'
import {Variable} from './Rules/Variable'
import * as fs from 'fs'
import * as esprima from 'esprima'
import { PropertyAsignment } from './Rules/PropertyAsignment';
import { PropertySemicolon } from './Rules/PropertySemicolon';
import { MethodProperty } from './Rules/MethodProperty';
import { MethodExpression } from './Rules/MethodExpression';
import { Class } from './Rules/Class';

export class Tree {
        root: any

    protected rules: any[] = [ MethodExpression,Variable, Class,
        MethodProperty, PropertyAsignment, PropertySemicolon] //Function
        constructor(file:string) {
            var code = fs.readFileSync(file, 'utf-8');
            console.log(code)
            this.root =  esprima.parseModule(code);
            
    }
    
    collect():IdentifierBag{
        return this.traverse(this.root, new IdentifierBag());
    }
    
    protected extractNode  (node: any): Identifier | Identifier[] {
        return this.rules
            .map(rule => new rule(node))
            .map(rule => rule.extract())
            //.filter()
            
        }
    
    private traverse(node: any, bag : IdentifierBag) : IdentifierBag {
        bag.append(this.extractNode(node));
        
        for (var key in node) { //iterate on root propreties
            var child = node[key]; //child= prorety
            if (typeof child === 'object' && child !== null) { //if property is object
                if (Array.isArray(child)) {
                    child.forEach(node => this.traverse(node, bag));
                } else {
                    this.traverse(child, bag);
                }
            }
        }
     
        return bag;
    }       
}
