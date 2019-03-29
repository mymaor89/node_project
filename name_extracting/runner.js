"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tree_1 = require("./Tree");
var path = "../tests/resources/fake-file.js";
var tree = new Tree_1.Tree(path);
console.log(tree.collect());
