import AdjacencyMatrix from "./adjacency-matrix/AdjacencyMatrix";
import IObserver from "./interface/IObserver";
import IObserverData from "./interface/IObserverData";
import Inventory from "./Inventory";
import Item from "./Item";
import { ItemCreatorFactoryByName } from "./items/item-creator-factory";

class CraftPlatform implements IObserver {
    private matrix: AdjacencyMatrix;
    private itemCreator: any;
    
    constructor (matrix: AdjacencyMatrix) {
        this.matrix = matrix;
        this.itemCreator = ItemCreatorFactoryByName;
    }

    onModifications = ({inventory, item, operationType}: IObserverData): void  =>{
       // оставил свитч для расширения - можно переписать в тернарный
        switch (operationType) {
            case 'add':
                this.craftItem(inventory, item);
                break;
            case 'remove':
                this.removeItem(inventory, item) 
                break;
            case 'disassembly':
                this.disassemblyItem(inventory, item);
                break;
           
          }
    }

    craftItem = (inventory: Inventory, item: Item) => {
        
        if (item.configurable) {
            let items = inventory.items.filter(item => item.configurable);
            let itemsName = items.map(item => item.name);

            inventory.items = [...inventory.items, item];

            let newItem = this.matrix.findEdgeNameExactlyOccurrenceAllEdges(item.name, itemsName);
            
            if (newItem) {
                inventory.removeItem(item);
                const createdNewItem: Item = this.itemCreator(newItem);
                const constituentsItemName = this.matrix.findAllOccurrencesInEdge(newItem);

                constituentsItemName.forEach(itemName => {
                    let item = this.itemCreator(itemName);
                    inventory.removeItem(item)
                });
                
                inventory.addItem(createdNewItem);
            }

        } else {
            inventory.items = [...inventory.items, item];
        }
        

    }

    isDisassemblyItem = (item: Item): boolean => {
       return this.matrix.isEdgeHaveEdges(item.name);
    }
    changeAssemblyCapabilityItem = (inventory: Inventory, item: Item) => {
        let indexItem = inventory.items.findIndex(oldItem => oldItem.id === item.id);
        let assemblyCapabilityItem = inventory.items[indexItem].assemblyCapability;

        let items = inventory.items.filter(item => item.configurable);
        let itemsName = items.map(item => item.name);
        let newItem = this.matrix.findEdgeNameExactlyOccurrenceAllEdges(item.name, itemsName)

        if (assemblyCapabilityItem || !newItem) {
            inventory.items[indexItem].changeAssemblyCapability()
        } else {
            inventory.items = inventory.items.filter(oldItem => oldItem.id !== item.id);
            let removedItem = this.itemCreator(item.name);
            inventory.addItem(removedItem);
        }
    }

    disassemblyItem = (inventory: Inventory, item: Item) => {
        const constituentsItemName = this.matrix.findAllOccurrencesInEdge(item.name);
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
    removeItem = (inventory: Inventory, item: Item) => {
        let removableItem: Item | undefined = inventory.items.find(oldItem => oldItem.name === item.name);
        if(removableItem?.id){
            inventory.items = inventory.items.filter( item => item.id !== removableItem?.id );
        }
    }

}

export default CraftPlatform;