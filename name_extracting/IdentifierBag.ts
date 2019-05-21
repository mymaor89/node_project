export class IdentifierBag{
    protected bag: any[]
    public size: number
    constructor() {
            this.bag = []
        }

    append(identifer) {
        this.bag.push(identifer)
        this.size++
    }

    filter(arg) {
        
        this.bag = this.bag.flat().filter(Boolean).flat()
   }
}