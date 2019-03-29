import { Tree } from "./Tree";

const path = "../tests/resources/fake-file.js"
var tree = new Tree(path)
console.log(tree.collect())