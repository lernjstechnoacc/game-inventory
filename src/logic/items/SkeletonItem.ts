import Item from "../Item";
import SkeletonSvg from '../../assets/SkeletonItem.svg'

function SkeletonItem(img: string = SkeletonSvg): Item {
    return new Item('Skeleton',0 , img);
}

export default SkeletonItem;