import Item from "../Item";
import { PRICE } from "../config";

import AncientHatSvg from '../../assets/AncientHat.svg';
import CatStaffSvg from '../../assets/CatStaff.svg';
import DOMbranchSvg from '../../assets/DOMbranch.svg';
import SwordOfAdenSvg from '../../assets/SwordOfAden.svg';
import FabricSvg from '../../assets/Fabric.svg';
import EventLoopTalismanSvg from '../../assets/EventLoopTalisman.svg';
import NullOfEnumSvg from '../../assets/NullOfEnum.svg';
import StaffOfDeathSvg from '../../assets/StaffOfDeath.svg';
import StaffOfProdSvg from '../../assets/StaffOfProd.svg';



function AncientHat(img: string = AncientHatSvg): Item {
    return new Item('Ancient hat',PRICE.ANCIENT_HAT, img);
}

function CatStaff(img: string = CatStaffSvg): Item {
    return new Item('Cat staff', PRICE.CAT_STAFF, img);
}

function DOMBranch(img: string = DOMbranchSvg): Item {
    return new Item('DOM branch', PRICE.DOM_BRANCH, img);
}

function SwordOfAden(img: string = SwordOfAdenSvg): Item {
    return new Item('Sword of Aden', PRICE.SWORD_OF_ADEN, img);
}

function Fabric(img: string = FabricSvg): Item {
    return new Item('Fabric', PRICE.FABRIC, img);
}

function EventLoopTalisman(img: string = EventLoopTalismanSvg): Item {
    return new Item('EventLoop Talisman',PRICE.FABRIC + PRICE.ANCIENT_HAT, img, false);
}

function NullOfEnum(img: string = NullOfEnumSvg): Item {
    return new Item('Null of Enum',PRICE.FABRIC + PRICE.DOM_BRANCH, img, true);
}
function StaffOfDeath(img: string = StaffOfDeathSvg): Item {
    return new Item('Staff of Death', PRICE.CAT_STAFF + PRICE.DOM_BRANCH + PRICE.FABRIC, img, false);
}
function StaffOfProd(img: string = StaffOfProdSvg): Item {
    return new Item('Staff of Prod', PRICE.DOM_BRANCH + PRICE.DOM_BRANCH, img, false);
}

export {AncientHat, CatStaff, DOMBranch, SwordOfAden, Fabric, EventLoopTalisman, NullOfEnum, StaffOfDeath, StaffOfProd};

