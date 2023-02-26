import Item from "../Item";
import { price } from "../config";

import AncientHatSvg from '../../assets/AncientHat.svg';
import CatStaffSvg from '../../assets/CatStaff.svg';
import DOMbranchSvg from '../../assets/DOMbranch.svg';
import SwordOfAdenSvg from '../../assets/SwordOfAden.svg';
import FabricSvg from '../../assets/Fabric.svg';
import EventLoopTalismanSvg from '../../assets/EventLoopTalisman.svg';
import NullOfEnumSvg from '../../assets/NullOfEnum.svg';





function AncientHat(img: string = AncientHatSvg): Item {
    return new Item('Ancient hat',price.ANCIENT_HAT, img);
}

function CatStaff(img: string = CatStaffSvg): Item {
    return new Item('Cat staff', price.CAT_STAFF, img);
}

function DOMBranch(img: string = DOMbranchSvg): Item {
    return new Item('DOM branch', price.DOM_BRANCH, img);
}

function SwordOfAden(img: string = SwordOfAdenSvg): Item {
    return new Item('Sword of Aden', price.SWORD_OF_ADEN, img);
}

function Fabric(img: string = FabricSvg): Item {
    return new Item('Fabric', price.FABRIC, img);
}

function EventLoopTalisman(img: string = EventLoopTalismanSvg): Item {
    return new Item('EventLoop Talisman',price.FABRIC + price.ANCIENT_HAT, img, false);
}

function NullOfEnum(img: string = NullOfEnumSvg): Item {
    return new Item('Null of Enum',price.FABRIC + price.DOM_BRANCH, img, false);
}

export {AncientHat, CatStaff, DOMBranch, SwordOfAden, Fabric, EventLoopTalisman, NullOfEnum};

