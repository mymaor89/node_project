/*import { expect } from "chai";
import * as esprima from 'esprima'
import { Class } from '../../name_extracting/Rules/Class'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";
import { ObjectLiteral } from "../../name_extracting/Rules/ObjectLiteral";
describe("recognize object literal es5,es6", () => {
    describe('#extract', () => {
        it('extracts an object literal identifier from OL declaration', () => {
            ['obj = {}'].forEach(declaration => {
                const identifyer = new ObjectLiteral(createNode(declaration)).extract()
                expect(identifyer[0]).to.have.property('name', 'obj')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Object_Literal)
            })
        })
        it('extracts an object literal with arrow function', () => {
            [`let obj = {
                func:()=>{}
                }`,
                `var obj = {
                func: () => {
                }
              }`].forEach(declaration => {
                    const identifyer = new ObjectLiteral(createNode(declaration)).extract()
                    expect(identifyer[0]).to.have.property('name', 'func')
                    expect(identifyer[0]).to.be.instanceOf(Identifier)
                    expect(identifyer[0]).to.have.property('type', IdentifierType.ArrowFunction)
                    expect(identifyer[1]).to.have.property('name', 'obj')
                    expect(identifyer[1]).to.be.instanceOf(Identifier)
                    expect(identifyer[1]).to.have.property('type', IdentifierType.Object_Literal)
                })
        })
        it('does not extracts a OL from a node that do not contains a OL identifyer', () => {
            ['person.name = function () {}', 'firstName: "moshe"'].forEach(declaration => {
                const identifyer = new ObjectLiteral(createNode(declaration)).extract()
                expect(identifyer).to.be.false
            })
        })

    })
})

function createNode(expression) {
    return esprima.parseScript(expression).body.pop()
}
*/