import Item from '../../Item';
import * as itemsCatalog from '../index';


function ItemCreatorFactoryByName(itemName: string): Item | null {
   console.log(itemName)

   switch(itemName) {
      case 'EventLoop Talisman':
         return itemsCatalog.EventLoopTalisman();  
      case 'Ancient hat':
         return itemsCatalog.AncientHat();  
      case 'DOM branch':
         return itemsCatalog.DOMBranch();  
      case 'Sword of Aden':
         return itemsCatalog.SwordOfAden();  
      case 'Cat staff':
         return itemsCatalog.CatStaff();  
      case 'Fabric':
         return itemsCatalog.Fabric();
      case 'Null of Enum':
         return itemsCatalog.NullOfEnum();    
      default:
        return null
   }
     
}
export default ItemCreatorFactoryByName;