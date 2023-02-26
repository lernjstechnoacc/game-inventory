import {useState, useEffect, FC} from 'react'
import ItemList from '../item-list/ItemList'
import ItemSlot from '../item-slot/ItemSlot'
import Item from '../../core/Item'
import CraftPlatform from '../../core/CraftPlatform'

interface CraftPanelProps {
    craftInfoItem: Item;
    craftPlatform: CraftPlatform;
}

interface CraftListProps {
    craftInfoItem: Item;
    craftList: Item[];
}

const CraftPanelView: FC<CraftPanelProps> = ({craftInfoItem, craftPlatform}) => {

    const [craftList, setCraftList] = useState<Item[]>([]);

    //todo read about hooks and react components lifecycle
    useEffect(() => {
        getCraftList(craftInfoItem);
    }, [craftInfoItem]);

    const getCraftList = (craftInfoItem: Item) => {
        let newCraftList: Item[] = [];

        //todo
        if (craftInfoItem.name !== 'Skeleton') {
            newCraftList = craftPlatform.getCraftListForItem(craftInfoItem);
            setCraftList(newCraftList);
        }

    }

    return (
        <div className='flex justify-center items-center px-5 mt-8 w-full'>
            <div
                className='flex justify-center items-center p-2 h-[180px] w-5/6 bg-black/70 rounded-xl shadow-inset-md'>
                {/*todo*/}
                {craftInfoItem.name !== 'Skeleton' ?
                    <CraftListView craftInfoItem={craftInfoItem} craftList={craftList}/> :
                    <h3 className=' text-zinc-600'>Click on item for details Craft</h3>}
            </div>
        </div>
    )
}

//todo encapsulate
const CraftListView: FC<CraftListProps> = ({craftInfoItem, craftList}) => {
    return (
        <div className='flex flex-col items-center'>
            <div>{craftList.length ?
                <ItemList
                    items={craftList}
                    renderItem={(item: Item) =>
                        <ItemSlot
                            draggable={false}
                            item={item}
                            key={item.id}
                        />}

                /> : null}
            </div>
            <div>
                {craftList.length ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                         stroke="currentColor" className="w-6 h-6 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/>
                    </svg>
                    : null}
            </div>
            <div className='p-3'>
                <img className=' select' src={craftInfoItem.img} draggable={false} alt={craftInfoItem.name}/>
            </div>
        </div>
    )
}

export default CraftPanelView;