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
                expect(identifyer[0]).to.have.property('type',IdentifierType.Variable)
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
                expect(identifyer[1]).to.have.property('type',IdentifierType.Variable)
            })
        })

          it('should extract Function decleration identifier ', () => {
              ['var x = function(){return true}'].forEach(declaration => {
                  const identifyer = new Variable(createNode(declaration)).extract()

                  expect(identifyer).to.be.an('array').with.lengthOf(1)
                  expect(identifyer[0]).to.have.property('name', 'x')
                  expect(identifyer[0]).to.be.instanceOf(Identifier)
                  //console.log(createNode(declaration))
                  expect(identifyer[0]).to.have.property('type', IdentifierType.Function)
              })
          })
          it('can extracted a mixed decleration')
          

          it('does not extracts a variable from a node that docontains a variable identifyer', () => {
              
          })
          
    })

    describe('#conforms', () => {

    })
})

function createNode(expression) {
    return esprima.parseScript(expression).body.pop()
}