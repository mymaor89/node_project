import { Rules } from "./Rules";
import { Identifier, IdentifierType } from "../Identifier";

export class Class extends Rules {
    handle(node) {
        return Identifier.fromClass(node.id.name);
    }
}