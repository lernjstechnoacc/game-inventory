import AdjacencyMatrix from "./adjacency-matrix/AdjacencyMatrix";
import CraftPlatform from "./CraftPlatform";
import Inventory from "./Inventory";
import Store from "./Store";
import Wallet from "./Wallet"
import {ItemsFactory} from './items/item-creator-factory/index'
import ILogic from "./interface/ILogic";

function useBuildLogic (): ILogic {
    const wallet = new Wallet('Aden', 1000);
    const matrix = new AdjacencyMatrix();

    matrix.addNode('Fabric');
    matrix.addNode('Ancient hat');
    matrix.addNode('Cat staff');
    matrix.addNode('DOM branch');
    matrix.addNode('Sword of Aden');
    matrix.addNode('EventLoop Talisman', ['Fabric', 'Ancient hat']);
    matrix.addNode('Null of Enum', ['Fabric', 'DOM branch']);
    matrix.addNode('Staff of Prod', ['DOM branch', 'DOM branch']);
    matrix.addNode('Staff of Death', ['Null of Enum', 'Cat staff']);


   
    const craftPlatform = new CraftPlatform(matrix);
    const inventory = new Inventory(craftPlatform);
    const store = new Store(ItemsFactory());
    inventory.observer.subscribe(wallet);
    inventory.observer.subscribe(craftPlatform)

    return {inventory, wallet, craftPlatform, store}

}

export default useBuildLogic;