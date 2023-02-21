import { FC, useState} from 'react'
import Item from '../../logic/Item';
import SkeletonItem from '../../logic/items/SkeletonItem';


import CraftPanelView from '../craft-panel-view/CraftPanelView';
import InventoryView from '../inventory-view/InventoryView';
import StoreView from '../store-view/StoreView';
import WalletView from '../wallet-view/WalletView';


let skeletonItem = SkeletonItem();

interface GameScreenProps {
    logic: any;
}

const GameScreen: FC<GameScreenProps>  = ({logic}) => {
    const {inventory, store, wallet, craftPlatform} = logic;
    const [currentDropItem, setCurrentDropItem] = useState<Item>(skeletonItem);
    const [itemInfo, setItemInfo] = useState<Item>(skeletonItem);

    return (
        <div className='p-5 w-full  h-[90vh] flex'>
            <div className=' w-1/2 flex flex-col justify-around items-center'>
                <div className='small-block'>
                    <WalletView wallet={wallet} />
                </div>
                <div className='small-block'>
                    <InventoryView inventory={inventory} currentDropItem={currentDropItem} />
                </div>
            </div>
            <div className='w-1/2 flex  items-center'>
                <div className='big-block flex flex-col items-center py-5 justify-between'>
                    <StoreView wallet={wallet}  setItemInfo={setItemInfo} store={store} setCurrentDropItem={setCurrentDropItem} />
                    <CraftPanelView craftPlatform={craftPlatform} craftInfoItem={itemInfo}/>
                </div>
            </div>
        </div>
    )
}

export default GameScreen;