import { Rules } from "./Rules";
import { Identifier, IdentifierType } from "../Identifier";

export class Class extends Rules {
    handle() {
        return Identifier.fromClass(this.node.id.name);
    }
}