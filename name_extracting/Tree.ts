import {IdentifierBag} from './IdentifierBag'
import { Identifier } from './Identifier';
import {Rules} from './Rules/Rules'
import {Variable} from './Rules/Variable'
import * as fs from 'fs'
import * as esprima from 'esprima'

export class Tree {
        root: any

        protected rules : any[] = [Variable, ]

        constructor(file:string) {
            var code = fs.readFileSync(file, 'utf-8');
            this.root =  esprima.parse(code);
            this.rules = this.rules.map(rule => new rule())
        }
        collectIdentifiers(bag : IdentifierBag):IdentifierBag{
            return this.traverse(this.root,bag);

        }
        protected identifyNode(node: any):string{
            
        }
        private traverse(node: any,bag:IdentifierBag):IdentifierBag{
            let id: Identifier = this.extractNode(node);
            if (id.getName() && id.getName().length> 0) {
                bag.append(id);
            }
            for (var key in node){
                if (node.hasOwnProperty(key)){
                    var child = node[key];
                    if (typeof child === 'object' && child !== null){
                        child.forEach(node => this.traverse (node , bag));
                    }else {
                        this.traverse(child, bag);
                    }
                    }
                }
                return bag;
            }
          
        }
}