import { Tree } from "../../name_extracting/Tree";
import { expect } from "chai";
import { IdentifierBag } from "../../name_extracting/IdentifierBag";
import { Identifier } from "../../name_extracting/Identifier";

describe.only("Extract from js file", () => {
    it("Reads from a file and extracts the identifiers", () => { 
        // given 
        const path = "./test/resources/fake-file.js"
        // when
        const tree = new Tree(path);
        let bag: IdentifierBag = tree.collect()
        bag.filter()
        console.log(bag)
        expect(bag).to.be.instanceOf(IdentifierBag)
        //expect(bag.size).to.be.equal(12)
        
        
    })
})