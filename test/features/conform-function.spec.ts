import { expect } from "chai";
import * as esprima from 'esprima'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";
import { Function } from "../../name_extracting/Rules/Function";
describe("recognize function", () => {
    describe('#extract', () => {
        it('extracts a function from a function declaration *with no params*', () => {
            ['function myFunc() {}'].forEach(declaration => {
                const identifyer = new Function(createNode(declaration)).extract()
                expect(identifyer).to.have.property('name', 'myFunc')
                expect(identifyer).to.be.instanceOf(Identifier)
                expect(identifyer).to.have.property('type', IdentifierType.Function)
            })
        })

        it('extracts a function with it\'s parameter from function decleration', () => {
            ['function myFunc(param1) {}'].forEach(declaration => {
                const identifyer = new Function(createNode(declaration)).extract()
                expect(identifyer).to.be.an('array').with.lengthOf(2)
                expect(identifyer[0]).to.have.property('name', 'param1')
                expect(identifyer[1]).to.have.property('name', 'myFunc')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Function)
            })
        })
        it('extracts a function with multiple parameters from function decleration', () => {
            ['function myFunc(param1,param2) {}'].forEach(declaration => {
                const identifyer = new Function(createNode(declaration)).extract()
                expect(identifyer).to.be.an('array').with.lengthOf(3)
                expect(identifyer[0]).to.have.property('name', 'param1')
                expect(identifyer[1]).to.have.property('name', 'param2')
                expect(identifyer[2]).to.have.property('name', 'myFunc')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.be.instanceOf(Identifier)
                expect(identifyer[2]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[2]).to.have.property('type', IdentifierType.Function)
            })
        })

        it('does not extracts a function from a node that do not contains a function identifyer', () => {
            ['person.name = function () {}', 'firstName: "moshe"'].forEach(declaration => {
                const identifyer = new Function(createNode(declaration)).extract()
                expect(identifyer).to.be.false
            })
        })

    })
})

function createNode(expression) {
    return esprima.parseScript(expression).body.pop()
}
