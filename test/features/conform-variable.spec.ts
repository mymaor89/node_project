import { expect } from "chai";
import * as esprima from 'esprima'
import {Variable} from '../../name_extracting/Rules/Variable'
import { Identifier, IdentifierType } from "../../name_extracting/Identifier";

describe("recognize variable", () => {
    describe('#extract', () => {
        it('extracts a variable from a variable declaration', () => {
            ['var x = 9', 'let x = 9', 'const x = 9'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()
            
                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Variable)
            })
        })
        
        it('extracts multiple variables from a variable list declartion', () => {
            ['var x = 9,y= 6', 'let x= 5, y =4 ', 'const x = 9, y = 3'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()
                expect(identifyer).to.be.an('array').with.lengthOf(2)
              
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[1]).to.have.property('name', 'y')
              
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.be.instanceOf(Identifier)

                expect(identifyer[0]).to.have.property('type', IdentifierType.Variable)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Variable)
            })
        })

        it('should extract Function decleration identifier ', () => {
            ['var x = function(){return true}'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()

                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Function)
            })
        })
        it('should extract Arrow Function decleration identifier ', () => {
            ['const add = (a, b) => a + b'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()
                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'add')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.ArrowFunction)
            })
        })
        it('should extract array decleration identifier ', () => {
            ['var x = [1,2,3]'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()

                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Array)
            })
        })
        
        it('should extract object literal decleration identifier ', () => {
            ['var myObject = {  prop1: "hello",  prop2: "world"  }'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()

                expect(identifyer).to.be.an('array').with.lengthOf(1)
                expect(identifyer[0]).to.have.property('name', 'myObject')
                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[0]).to.have.property('type', IdentifierType.Object_Literal)
            })
        })
        it('can extracted a mixed decleration', () => {
            ['var x = 9,y= function(){return true},z=["hey","bye"]'].forEach(declaration => {
                const identifyer = new Variable(createNode(declaration)).extract()
                expect(identifyer).to.be.an('array').with.lengthOf(3)
                expect(identifyer[0]).to.have.property('name', 'x')
                expect(identifyer[1]).to.have.property('name', 'y')
                expect(identifyer[2]).to.have.property('name', 'z')

                expect(identifyer[0]).to.be.instanceOf(Identifier)
                expect(identifyer[1]).to.be.instanceOf(Identifier)
                expect(identifyer[2]).to.be.instanceOf(Identifier)

                expect(identifyer[0]).to.have.property('type', IdentifierType.Variable)
                expect(identifyer[1]).to.have.property('type', IdentifierType.Function)
                expect(identifyer[2]).to.have.property('type', IdentifierType.Array)
            })
        })

            it('does not extracts a variable from a node that do not contains a variable identifyer', () => {
                ['person.name = function () {}', 'firstName: "moshe"'].forEach(declaration => {
                    const identifyer = new Variable(createNode(declaration)).extract()
                    expect(identifyer).to.be.false
                })
            })
          
        })
    })
    
    function createNode(expression) {
        return esprima.parseScript(expression).body.pop()
    }
