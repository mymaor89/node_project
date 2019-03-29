import { expect } from "chai";
import * as esprima from 'esprima'
import {Class} from '../../name_extracting/Rules/Class'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";
describe("recognize class", () => {
    describe('#extract', () => {
        it('extracts a class from a class declaration', () => {
            ['var x = 9', 'let x = 9', 'const x = 9'].forEach(declaration => {
                const identifyer = new Class(createNode(declaration)).extract()

                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Class)
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
