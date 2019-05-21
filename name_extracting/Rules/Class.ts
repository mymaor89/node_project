import { Rules } from "./Rules";
import { Identifier, IdentifierType } from "../Identifier";

//import { PropertyAsignment } from "./PropertyAsignment"
import { ClassDeclaration, ClassBody, MethodDefinition, ClassExpression } from "estree";
export class Class extends Rules {

    protected conforms(): boolean {
        return (this.node.type === this.declaration)

    }
    handle() {
        let identifiers: Identifier[] | false = []
        let class_body: MethodDefinition[] = (this.node as ClassDeclaration).body.body
        if (class_body.length != 0) {
            for (let ele of class_body) {
                let params = ele.value.params
                for (var param of params) {
                    if ('name' in param)
                        identifiers.push(Identifier.fromParameter(param.name))
                    if ((ele as MethodDefinition).kind === 'constructor') {
                        let members = ele.value.body.body
                        for (var mem of members) {
                            if (mem.type === 'ExpressionStatement' &&
                                mem.expression.type === 'AssignmentExpression' &&
                                mem.expression.left.type === 'MemberExpression') {
                                if ('name' in mem.expression.left.property) {
                                    let mem_name = mem.expression.left.property.name
                                    identifiers.push(Identifier.fromProperty(mem_name))
                                }
                            }
                        }
                    }
                    else {
                        if ('name' in ele.key)
                            identifiers.push(Identifier.fromMethod(ele.key.name))
                    }
                }

            }
            
            identifiers.push(Identifier.fromClass((this.node as ClassDeclaration).id.name))
            return identifiers
        }
        else {
            
            return Identifier.fromClass((this.node as ClassDeclaration).id.name)
        }
    }
}