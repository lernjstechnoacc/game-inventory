import Inventory from "../Inventory";
import Item from "../Item";

type operationType = 'add' | 'remove' | 'disassembly';

interface IObserverData {
    inventory: Inventory;
    item: Item;
    operationType: operationType;

}

export default IObserverData;