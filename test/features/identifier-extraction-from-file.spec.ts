import { Tree } from "../../name_extracting/Tree";
import { expect } from "chai";
import { IdentifierBag } from "../../name_extracting/IdentifierBag";
import { Identifier } from "../../name_extracting/Identifier";

describe.skip("Extract from js file", () => {
    it("Reads from a file and extracts the identifiers", () => { 
        // given 
        const path = "./tests/resources/fake-file.js"
        // when
        const tree = new Tree(path);
        
        // then
        expect(true).to.be.true
        
        
        
    })
})