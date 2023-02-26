import AdjacencyMatrix from "./adjacency-matrix/AdjacencyMatrix";
import IObserver from "./interface/IObserver";
import IObserverData from "./interface/IObserverData";
import Inventory from "./Inventory";
import Item from "./Item";
import { ItemCreatorFactoryByName } from "./items/item-creator-factory";

class CraftPlatform implements IObserver {
    private matrix: AdjacencyMatrix;
    //todo change function type
    private itemCreator: any;
    
    constructor (matrix: AdjacencyMatrix) {
        this.matrix = matrix;
        this.itemCreator = ItemCreatorFactoryByName;
    }

    notify = ({inventory, item, operationType}: IObserverData): void  =>{
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

    craftItem = (inventory: Inventory, item: Item) => {
        if (item.configurable) {
            //todo inventory.getConfigurableItems();
            let items = inventory.items.filter(item => item.configurable);
            //todo inventory.getItemNames(filterCallback); () => item => item.configurable
            let itemsName = items.map(item => item.name);
            //todo setCurrentItems();
            inventory.items = [...inventory.items, item];

            //type {value: string, isEmpty: () => boolean}
            let newItem: string = this.matrix.findEdgeNameExactlyOccurrenceAllEdges(item.name, itemsName);


            //todo better conditions
            if (newItem) {
                //itemCreator.create(newItem)
                const createdNewItem: Item = this.itemCreator(newItem);

                //todo name is supposed to be a string
                const constituentsItemNames: string[] = this.matrix.findAllOccurrencesInEdge(newItem);
                const filterItems = inventory.items.filter(this.filterConfigurableItemsCallback);

                constituentsItemNames.forEach(itemName => {
                    //todo to much looping through, think about join the redundant loops
                    let item = filterItems.find(item => item.name === itemName);

                    //todo inventory.removeItem(item), and let the condition be encapsulated there
                    if (item !== undefined) {
                        inventory.removeItem(item);
                    }
                });
                
                inventory.addItem(createdNewItem);
            }

        } else {
            //todo encapsulate and name the method respectively
            inventory.items = [...inventory.items, item];
        }
        

    }

    public filterConfigurableItemsCallback(item: Item) {
        return (item: Item) => item.configurable;
    };

    //todo canBeDismantled
    // isAbleToBeDismantled
    isDisassemblyItem = (item: Item): boolean => {
       return this.matrix.isEdgeHaveEdges(item.name);
    }

    changeAssemblyCapabilityItem = (inventory: Inventory, item: Item) => {
        //todo const currentItem = inventory.getItem(item): Item;
        let indexItem = inventory.items.findIndex(oldItem => oldItem.id === item.id);
        //const {assemblyCapability} = currentItem;
        let assemblyCapabilityItem = inventory.items[indexItem].assemblyCapability;

        //todo to much looping through, think about join the redundant loops
        let items = inventory.items.filter(item => item.configurable);
        let itemsName = items.map(item => item.name);
        let newItem = this.matrix.findEdgeNameExactlyOccurrenceAllEdges(item.name, itemsName)

        if (assemblyCapabilityItem || !newItem) {
            inventory.items[indexItem].changeAssemblyCapability()
        } else {
            inventory.removeItem(item);
            let removedItem = this.itemCreator(item.name);
            inventory.addItem(removedItem);
        }
    }

    disassemblyItem = (inventory: Inventory, item: Item) => {
        //todo a lot of duplications, think about it
        const constituentsItemName = this.matrix.findAllOccurrencesInEdge(item.name);
        if (constituentsItemName.length > 0){
            const disassembledItems: Item[] = [];
            inventory.items = inventory.items.filter(oldItem => oldItem.id !== item.id);

            constituentsItemName.forEach(itemName =>{
                let createdItem: Item = this.itemCreator(itemName);
                createdItem.changeAssemblyCapability();
                
                disassembledItems.push(createdItem);
            });

            inventory.items = [...inventory.items, ...disassembledItems];
        }
    }

    removeItemByID = (inventory: Inventory, item: Item) => {
        //todo you've got Inventory.removeItem;
        inventory.items = inventory.items.filter( oldItem => oldItem.id !== item.id );
    }

    getCraftListForItem = (item: Item): any => {
       return this.matrix.findAllOccurrencesEdgesInEdge(item.name).map(itemName =>{
            return ItemCreatorFactoryByName(itemName);
       });
    }

}

export default CraftPlatform;