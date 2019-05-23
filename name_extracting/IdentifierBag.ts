export class IdentifierBag{
    protected bag: any[]
    public size: number = 0
    constructor() {
            this.bag = []
        }

    append(identifer) {
        this.bag.push(identifer)
        this.size++
    }

    public filter() {
        this.bag = this.bag.flat(2).filter(Boolean).flat()
   }
}