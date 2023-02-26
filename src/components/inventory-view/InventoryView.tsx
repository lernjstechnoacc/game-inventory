import {useState, useEffect, FC} from 'react'
import ItemList from '../item-list/ItemList';
import ItemSlot from '../item-slot/ItemSlot';
import Item from '../../core/Item';
import Inventory from '../../core/Inventory';
import SkeletonItem from '../../core/items/SkeletonItem';
import SkeletonSvg from '../../assets/SkeletonItem.svg';
import overIcon from '../../assets/overIcon.svg';
import sellIconSvg from '../../assets/sellIcon.svg';
import dissIconSvg from '../../assets/dissIcon.svg';
import configurableBlockSvg from '../../assets/blockIcon.svg';

interface InventoryViewProps {
    inventory: Inventory;
    currentDropItem: Item;
}

type ItemState = {
    item: Item;
    isSelected: boolean;
}

//todo weird function using. new? getSkeletonItem?
let skeletonItem = SkeletonItem();

const InventoryView: FC<InventoryViewProps> = ({currentDropItem, inventory}) => {
    const [inventoryItems, setInventoryItems] = useState<Item[]>([]);
    const [isSelectItem, setIsSelectItem] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item>(skeletonItem);

    useEffect(() => {
        //todo remember
        setInventoryItems(inventoryItems => [...inventoryItems, ...inventory.items]);
        // eslint-disable-next-line
    }, []);

    //todo do you need it?
    useEffect(() => {
        setInventoryItems([...inventory.items])
    }, [inventory.items]);


    //todo not render
    const renderInventory = (): Item[] => {
        let arrayRenderItems: Item[] = [];

        for (let i = 0; i < inventory.cells; i++) {
            if (inventoryItems[i] !== undefined) {
                arrayRenderItems.push(inventory.items[i]);
            } else {
                arrayRenderItems.push(SkeletonItem());
            }
        }
        return arrayRenderItems;

    }

    //todo think about abstractions for drag&drop
    //todo let's use consistent names for handlers handleSomething, onSomething
    const dragWithPreventHandler = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();

        //todo how much changes do you need to change your outlet to real values?
        if (e.currentTarget.alt === 'Skeleton') {
            e.currentTarget.src = overIcon;
        }

    }

    const leaveHandler = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();

        if (e.currentTarget.alt === 'Skeleton') {
            e.currentTarget.src = SkeletonSvg;
        }

    }

    const dropHandler = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();

        if (currentDropItem.name === 'Skeleton') {
            leaveHandler(e)
            return false;
        }

        inventory.addItemByName(currentDropItem.name);

        //todo *
        setInventoryItems([...inventory.items]);
    }

    const cleanSelectedItem = () => {
        setSelectedItem(skeletonItem);
        setIsSelectItem(false);
    }

    const onClickSelectItem = (e: React.MouseEvent<HTMLImageElement>) => {
        if (e.currentTarget.alt !== 'Skeleton') {
            let id: string = e.currentTarget.id;
            //todo inventory abstraction pleas use it
            let newSelectedItem = inventory.items.find((item) => item.id === id);

            if (newSelectedItem === selectedItem) {
                cleanSelectedItem();
                return;
            }

            if (newSelectedItem !== undefined) {
                setSelectedItem(newSelectedItem);
                setIsSelectItem(true);
            }
        }
    }

    const onClickSellItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isSelectItem) {
            return false;
        }

        inventory.removeItem(selectedItem);
        cleanSelectedItem();
        setInventoryItems([...inventory.items]);
    }

    const onClickChangeConfigurableItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isSelectItem) {
            return false;
        }

        inventory.changeAssemblyCapability(selectedItem);
        setInventoryItems(items => [...inventory.items]);

    }

    const onClickDisassembleItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isSelectItem || !inventory.isDisassemblyItem(selectedItem)) {
            return false;
        }

        inventory.disassemblyItem(selectedItem);
        cleanSelectedItem();
        setInventoryItems(items => [...inventory.items]);
    }

    let items: Item[] = renderInventory();
    let styleCongigurableBlock = isSelectItem ? 'btn-block active-btn' : 'btn-block';
    let styleDisassembleBlock = inventory.isDisassemblyItem(selectedItem) ? 'btn-block active-btn' : 'btn-block';

    //todo check it
    const renderSellButton = () => {
        return <button disabled={!isSelectItem} onClick={onClickSellItem}
                       className={isSelectItem ? 'sell-block btn-block active-btn' : 'sell-block btn-block'}>
            <img className=' w-12' src={sellIconSvg} alt=""/>
            <span>Sell</span>
        </button>;
    };

    return (
        <>
            <h2 className='h2-title mb-2'>Inventory</h2>
            <div className='flex justify-around'>
                <div className='flex justify-center items-center'>
                    {renderSellButton()}
                </div>
                <div className='w-[220px]'>
                    <div className='w-full h-full bg-black/70 rounded-xl shadow-inset-md mx-auto'>
                        <ItemList
                            items={items}
                            //GOOD
                            renderItem={(item: Item) =>
                                <ItemSlot
                                    draggable={false}
                                    onDragOver={dragWithPreventHandler}
                                    onDragLeave={leaveHandler}
                                    onDrop={dropHandler}
                                    onClick={onClickSelectItem}
                                    selectedItemID={selectedItem.id}
                                    item={item}
                                    key={item.id}
                                />}

                        />

                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <button disabled={!inventory.isDisassemblyItem(selectedItem)} onClick={onClickDisassembleItem}
                            className={styleDisassembleBlock}>
                        <img src={dissIconSvg} alt="disable"/>
                        <span>Dissamble</span>
                    </button>
                    <button disabled={!isSelectItem} onClick={onClickChangeConfigurableItem}
                            className={styleCongigurableBlock}>
                        <img src={configurableBlockSvg} alt="block"/>
                        <span>Block</span>
                    </button>
                </div>

            </div>
        </>
    )
}

export default InventoryView;

