import React, {FC} from 'react';
import Item from '../../logic/Item';


interface ItemProps {
    item: Item;
    draggable: boolean;
    price?: number;
    walletAmount?: number;
    selectedItemID?: string;
    onDrag?: (e: React.DragEvent<HTMLImageElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLImageElement>) => void;
    onDragLeave?: (e: React.DragEvent<HTMLImageElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLImageElement>) => void;
    onClick?:(e: React.MouseEvent<HTMLImageElement>) => void;

}
interface PriceViewProps{
    price: number;
}

const ItemSlot: FC<ItemProps> = ({item, price, walletAmount, selectedItemID, ...dragEvents}) => {
   let isSelectItem = item.id === selectedItemID;

   const canBuyItemStyleCheck = ():string =>{
     if(walletAmount && price){
        return (walletAmount - price >= 0) ? 'border-orange-400  text-orange-400 m-1' : ''
     }else{
        return ''
     }
   }

   let styleBlock: string =  !item.assemblyCapability ? 'opacity-90  brightness-50 m-1' : ' m-1';
   let styleSelect: string = isSelectItem ? 'select' : '';
   let styleCanBuy: string = canBuyItemStyleCheck();
   let styleImg = `${styleBlock}  ${styleSelect}`;

    return (
       
        <li className={styleCanBuy || styleImg} >
           <img className={`${styleBlock} w-12 h-12  ${styleSelect}`}
           {...dragEvents}
             src={item.img} id={item.id} alt={item.name}/>
             {price ? <PriceView price={price}/> : null}
        </li>
    );
};

const PriceView: FC<PriceViewProps> = ({price}) =>{
    return (
        <div className='item-price flex items-center justify-center'>
            <span>{price}</span>
        </div>
    );
}

export default ItemSlot;
