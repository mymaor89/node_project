import { expect } from "chai";
import * as esprima from 'esprima'
import { Class } from '../../name_extracting/Rules/Class'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";
describe("recognize class", () => {
    describe('#extract', () => {
        it('extracts a class from a class declaration', () => {
            ['class User {}'].forEach(declaration => {
                const identifyer = new Class(createNode(declaration)).extract()
                expect(identifyer).to.have.property('name', 'User')
                expect(identifyer).to.be.instanceOf(Identifier)
                expect(identifyer).to.have.property('type', IdentifierType.Class)
            })
        })
        it('extracts a class and method from a class declaration', () => {
            ['class User {sayHi(param1) {}}'].forEach(declaration => {
                const identifyer = new Class(createNode(declaration)).extract()
                expect(identifyer[0]).to.have.property('name', 'param1')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[1]).to.have.property('name', 'sayHi')
                expect(identifyer[1]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Method)
                expect(identifyer[2]).to.have.property('name', 'User')
                expect(identifyer[2]).to.be.instanceOf(Identifier)
                expect(identifyer[2]).to.have.property('type', IdentifierType.Class)

            })
        })
        it('extracts a class with constructor,property and method with param', () => {
            ['class User {constructor(name) { this._name = name;}sayHi(param1) {}}'].forEach(declaration => {
                const identifyer = new Class(createNode(declaration)).extract()
                expect(identifyer[0]).to.have.property('name', 'name')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[1]).to.have.property('name', '_name')
                expect(identifyer[1]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Property)
                expect(identifyer[2]).to.have.property('name', 'param1')
                expect(identifyer[2]).to.be.instanceOf(Identifier)
                expect(identifyer[2]).to.have.property('type', IdentifierType.Parameter)
                expect(identifyer[3]).to.have.property('name', 'sayHi')
                expect(identifyer[3]).to.be.instanceOf(Identifier)
                expect(identifyer[3]).to.have.property('type', IdentifierType.Method)
                expect(identifyer[4]).to.have.property('name', 'User')
                expect(identifyer[4]).to.be.instanceOf(Identifier)
                expect(identifyer[4]).to.have.property('type', IdentifierType.Class)
            })
        })
        it('does not extracts a class from a node that do not contains a class identifyer', () => {
            ['person.name = function () {}', 'firstName: "moshe"'].forEach(declaration => {
                const identifyer = new Class(createNode(declaration)).extract()
                expect(identifyer).to.be.false
            })
        })

    })
})

function createNode(expression) {
    return esprima.parseScript(expression).body.pop()
}
