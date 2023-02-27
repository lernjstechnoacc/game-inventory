import Item from "../Item";
import SkeletonSvg from '../../assets/SkeletonItem.svg'

class SkeletonItem extends Item{
    constructor(name: string = 'Skeleton',price: number = 0, img: string = SkeletonSvg, configurable: boolean = false ){
        super(name,price,img,configurable);
    }
}

export default SkeletonItem;