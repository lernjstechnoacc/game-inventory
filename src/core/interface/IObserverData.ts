import Inventory from "../Inventory";
import Item from "../Item";

type operationType = 'add' | 'remove' | 'disassembly';

// todo interface IObserverData<PayloadType> {
interface IObserverData {
    inventory: Inventory;
    item: Item;
    operationType: operationType;

    //todo payload: PayloadType;

}

// const inventoryPayload: IObserverData<{pisyun: boolean}> = {pisyun: true};

export default IObserverData;