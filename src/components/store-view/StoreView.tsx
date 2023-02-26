import React, {FC, useEffect, useState} from 'react';
import Item from '../../core/Item';
import SkeletonItem from '../../core/items/SkeletonItem';
import Store from '../../core/Store';
import Wallet from '../../core/Wallet';

import ItemList from '../item-list/ItemList';
import ItemSlot from '../item-slot/ItemSlot';

let skeletonItem = SkeletonItem();

interface StoreViewProps {
    wallet: Wallet;
    store: Store
    setCurrentDropItem: any;
    setItemInfo: any;

}

const StoreView: FC<StoreViewProps> = ({setCurrentDropItem, store, setItemInfo, wallet}) => {
    const [storeItems, setStoreItems] = useState<Item[]>([]);

    //todo
    useEffect(() => {
        setItemInStore();
        setInterval(setItemInStore, 2000);
    }, []);


    const setItemInStore = () => {
        setStoreItems([...store.items]);
    }

    const dragHandler = (e: React.DragEvent<HTMLImageElement>) => {
        const item = storeItems.find((item) => item.id === e.currentTarget.id);

        if (item !== undefined && wallet.coinAmount >= item.price) {
            setCurrentDropItem(item);
        } else {
            setCurrentDropItem(skeletonItem);
        }
    }

    const onClickGetInfo = (item: Item) => {
        setItemInfo(item);
    }

    return (
        <div className=''>
            <h2 className=' h2-title h-9 bg-gradient-to-br mb-4 from-orange-400/90 to-amber-400/90'>Store</h2>
            <div className='px-4 flex-auto'>
                <ItemList
                    items={storeItems}
                    renderItem={(item: Item) =>
                        <ItemSlot
                            draggable={true}
                            onClick={() => setItemInfo(item)}
                            onDrag={dragHandler}
                            price={item.price}
                            walletAmount={wallet.coinAmount}
                            item={item}
                            key={item.id}
                        />}
                />
            </div>
        </div>
    )
}

export default StoreView;