import { Identifier } from "../Identifier";
import { Node } from "estree";

export abstract class Rules {

    protected readonly node: Node

    constructor(node: Node) {
        this.node = node
    }
    protected declaration = `${this.constructor.name}Declaration` //Template literal (ES6)

    protected conforms(): boolean {
        return this.node.type === this.declaration
    }

    abstract handle(): Identifier | Identifier[] 

    extract(): Identifier | Identifier[]| boolean {
        if (this.conforms())
            return this.handle()
        else
            return false

    }
}
