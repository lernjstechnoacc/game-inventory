import AdjacencyMatrix from "./adjacency-matrix/AdjacencyMatrix";
import IObserver from "./interface/IObserver";
import IObserverData from "./interface/IObserverData";
import Inventory from "./Inventory";
import Item from "./Item";
import { ItemCreatorFactory } from "./items/item-creator-factory";
import SkeletonItem from "./items/SkeletonItem";

class CraftPlatform implements IObserver {
    private matrix: AdjacencyMatrix;
    private itemCreator: any;
    
    constructor (matrix: AdjacencyMatrix) {
        this.matrix = matrix;
        this.itemCreator = ItemCreatorFactory;
    }

    public onModifications = ({inventory, item, operationType}: IObserverData): void  =>{
        switch (operationType) {
            case 'add':
                this.craftItem(inventory, item);
                break;
            case 'remove':
                this.removeItemByID(inventory, item); 
                break;
            case 'disassembly':
                this.disassemblyItem(inventory, item);
                break;
           
          }
    }

    public craftItem = (inventory: Inventory, item: Item) => {
        
        if (item.configurable) {
            let items = inventory.items.filter(item => item.configurable);
            let itemsName = items.map(item => item.name);
            inventory.items = [...inventory.items, item];
            let newItem = this.matrix.findNodeNameExactlyAdjacencyToAllEdges(item.name, itemsName);
            
            if (newItem) {
                const createdNewItem: Item = this.itemCreator(newItem);
                const constituentsItemName = this.matrix.findNodeNamesByAdjacencyEdge(newItem);
                const filterItems = inventory.items.filter(item => item.configurable);

                constituentsItemName.forEach(itemName => {
                    let item = filterItems.find(item => item.name === itemName);
                    if (item !== undefined) {
                        let indexItem = filterItems.indexOf(item);
                        inventory.removeItem(item);
                        filterItems[indexItem] = new SkeletonItem();
                    }
                });
                
                inventory.addItem(createdNewItem);
            }

        } else {
            inventory.items = [...inventory.items, item];
        }
        

    }

    public isDisassemblyItem = (item: Item): boolean => {
       return this.matrix.isNodeHaveEdges(item.name);
    }
    public changeAssemblyCapabilityItem = (inventory: Inventory, item: Item) => {
        let indexItem = inventory.items.findIndex(oldItem => oldItem.id === item.id);
        let assemblyCapabilityItem = inventory.items[indexItem].assemblyCapability;

        let items = inventory.items.filter(item => item.configurable);
        let itemsName = items.map(item => item.name);
        let newItem = this.matrix.findNodeNameExactlyAdjacencyToAllEdges(item.name, itemsName)

        if (assemblyCapabilityItem || !newItem) {
            inventory.items[indexItem].changeAssemblyCapability()
        } else {
            inventory.removeItem(item);
            let removedItem = this.itemCreator(item.name);
            inventory.addItem(removedItem);
        }
    }

    public disassemblyItem = (inventory: Inventory, item: Item) => {
        const constituentsItemName = this.matrix.findNodeNamesByAdjacencyEdge(item.name);
        if(constituentsItemName.length > 0){
            const disassembledItems:Item[] = [];
            inventory.items = inventory.items.filter(oldItem => oldItem.id !== item.id);

            constituentsItemName.forEach(itemName =>{
                let createdItem: Item = this.itemCreator(itemName);
                createdItem.changeAssemblyCapability();
                
                disassembledItems.push(createdItem);
            });

            inventory.items = [...inventory.items, ...disassembledItems];
        }
    }

    public removeItemByID = (inventory: Inventory, item: Item) => {
        inventory.items = inventory.items.filter( oldItem => oldItem.id !== item.id );
    }

    public getCraftListForItem = (item: Item): any => {
       return this.matrix.findAdjacencyEdgeNamesInNode(item.name).map(itemName =>{
            return this.itemCreator(itemName);
       });  
    }

}

export default CraftPlatform;