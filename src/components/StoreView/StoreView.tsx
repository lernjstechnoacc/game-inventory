import React, { FC, useEffect, useState } from 'react';
import Item from '../../logic/Item';
import Store from '../../logic/Store';
import Wallet from '../../logic/Wallet';

import ItemList from '../item-list/ItemList';
import ItemSlot from '../item-slot/ItemSlot';

interface StoreViewProps {
    wallet: Wallet;
    walletAmount: number;
    store: Store
    setCurrentDropName: any;
  
}

const StoreView: FC<StoreViewProps> = ({wallet, walletAmount, setCurrentDropName, store}) => {  
    const [storeItems, setStoreItems] = useState<Item[]>([]);
    
    useEffect(()=>{
        setStoreItems(storeItems => [...store.items]);
        // eslint-disable-next-line 
    },[wallet.coinAmount, walletAmount])

    const dragHandler = (e: React.DragEvent<HTMLImageElement>) => {

        const item = storeItems.find((item) => item.id === e.currentTarget.id)
        if(item !== undefined && walletAmount >= item.price ){
            console.log(item);
        
            setCurrentDropName(e.currentTarget.alt)
        }else{
            setCurrentDropName('');
        }
    
        
    }
    
    const onClickGetInfo = (item: Item) =>{
        console.log(1)
    }


    return (
        <div className='big-block flex flex-col items-center py-5'>
            <h2 className=' h2-title h-9 bg-gradient-to-br mb-4 from-orange-400/90 to-amber-400/90'>Store</h2>
            <div className='px-4 flex-auto'>
            <ItemList
            items={storeItems}
            renderItem={(item: Item) =>
                <ItemSlot
                    draggable={true}
                    onClick={()=> onClickGetInfo(item)}  
                    onDrag={dragHandler}
                    price = {item.price}
                    walletAmount = {walletAmount}
                    item={item}
                    key={item.id}
                />}

            />
            </div>

            <div className=' w-full h-36 px-5 mt-4'>
                <div className='w-full h-full bg-black/70 rounded-xl shadow-inset-md p-5'></div>
            </div>
        
        </div>

   
    )
}

export default StoreView;