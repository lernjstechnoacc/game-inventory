import {inventory} from "./config";
import CraftPlatform from "./CraftPlatform";
import Item from "./Item";
import InventoryObserver from "./observer/InventoryObserver";

class Inventory {
    public items: Item[];
    public observer: InventoryObserver;
    private _cells: number;
    private craftPlatform: CraftPlatform

    constructor (craftPlatform: CraftPlatform, items: Item[] = [], cells = inventory.DEFAULT_CELLS) {
        this.items = items;
        this.observer = new InventoryObserver();
        this._cells = cells;
        this.craftPlatform = craftPlatform;
    }

    get cells() {
        return this._cells
    }

    addItem = (item: Item) => {
        if (this.items.length < this._cells) {
            this.observer.notifyAll({inventory: this, item, operationType: 'add'});
        } 
        
    }

    removeItem = (item: Item) => {
        this.observer.notifyAll({inventory: this, item, operationType: 'remove'});
    }
    
    isDisassemblyItem = (item: Item) => {
      return  this.craftPlatform.isDisassemblyItem(item);
    }

    disassemblyItem = (item: Item) => {
        this.craftPlatform.disassemblyItem(this, item);
    }

    changeAssemblyCapability = (item: Item) => {
        this.craftPlatform.changeAssemblyCapabilityItem(this, item);
    }

}

export default Inventory