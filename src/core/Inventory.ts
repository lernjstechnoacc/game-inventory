import {INVENTORY} from "./config";
import CraftPlatform from "./CraftPlatform";
import Item from "./Item";
import { ItemCreatorFactory } from "./items/item-creator-factory";
import InventoryObserver from "./observer/InventoryObserver";

class Inventory {
    public items: Item[];
    public observer: InventoryObserver;
    private _cells: number;
    private craftPlatform: CraftPlatform

    constructor (craftPlatform: CraftPlatform, items: Item[] = [], cells = INVENTORY.DEFAULT_CELLS) {
        this.items = items;
        this.observer = new InventoryObserver();
        this._cells = cells;
        this.craftPlatform = craftPlatform;
    }

    get cells() {
        return this._cells
    }

    public addItem = (item: Item) => {
        if (this.items.length < this._cells) {
            this.observer.notifyAll({inventory: this, item, operationType: 'add'});
        } 
        
    }
    public addItemByName = (itemName: string) => {
        let item = ItemCreatorFactory(itemName);
        if (this.items.length < this._cells && item !== null) {
            this.observer.notifyAll({inventory: this, item, operationType: 'add'});
        } 
    }

    public removeItem = (item: Item) => {
        this.observer.notifyAll({inventory: this, item, operationType: 'remove'});
    }
    
    public isDisassemblyItem = (item: Item) => {
      return  this.craftPlatform.isDisassemblyItem(item);
    }

    public disassemblyItem = (item: Item) => {
        this.craftPlatform.disassemblyItem(this, item);
    }

    public changeAssemblyCapability = (item: Item) => {
        this.craftPlatform.changeAssemblyCapabilityItem(this, item);
    }

}

export default Inventory;