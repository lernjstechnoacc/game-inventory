import AdjacencyMatrix from "./adjacency-matrix/AdjacencyMatrix";
import CraftPlatform from "./CraftPlatform";
import Inventory from "./Inventory";
import Store from "./Store";
import Wallet from "./Wallet"
import {CreatorAllItems} from './items/item-creator-factory/index'

function useBildLogic () {
    const wallet = new Wallet('Aden', 1000);
    const matrix = new AdjacencyMatrix();

    matrix.addEdge('Fabric');
    matrix.addEdge('Ancient hat');
    matrix.addEdge('Cat staff');
    matrix.addEdge('DOM branch');
    matrix.addEdge('Sword of Aden');
    matrix.addEdge('EventLoop Talisman', ['Fabric', 'Ancient hat']);
    matrix.addEdge('Null of Enum', ['Fabric', 'DOM branch']);
   
    const craftPlatform = new CraftPlatform(matrix);
    const inventory = new Inventory(craftPlatform);
    const store = new Store(CreatorAllItems());
    inventory.observer.subscribe(wallet);
    inventory.observer.subscribe(craftPlatform)

    return {inventory, wallet, craftPlatform, store}

}

export default useBildLogic;