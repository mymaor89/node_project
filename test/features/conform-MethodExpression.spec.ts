import { expect } from "chai";
import * as esprima from 'esprima'
import { MethodExpression } from '../../name_extracting/Rules/MethodExpression'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";
describe("recognize Method expression", () => {
    describe('#extract', () => {
        it('extracts a method from a method expression', () => {
            [' myObject.somemethod = function(){}']
                .forEach(declaration => {
                    const identifyer = new MethodExpression(createNode(declaration)).extract()
                    expect(identifyer).to.have.property('name', 'somemethod')
                    expect(identifyer).to.be.instanceOf(Identifier)
                    expect(identifyer).to.have.property('type', IdentifierType.Method)
                })
        })

        it('does not extracts a method from a node that do not contains a method', () => {
            ['x=4', 'firstName: "moshe"'].forEach(declaration => {
                const identifyer = new MethodExpression(createNode(declaration)).extract()
                expect(identifyer).to.be.false
            })
        })

    })
})

function createNode(expression) {
    return esprima.parseScript(expression).body.pop()
}
