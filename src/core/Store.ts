import Item from './Item'

class Store {
    public items: Item[];

    constructor (items: Item[] = []) {
        this.items = items;
    }
}

export default Store;