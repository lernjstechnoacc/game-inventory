import Item from '../../Item';
import * as itemsCatalog from '../index';


function ItemCreatorFactory(itemName: string): Item | null {

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
      case 'Staff of Death':
         return itemsCatalog.StaffOfDeath();
      case 'Staff of Prod':
         return itemsCatalog.StaffOfProd();    
      default:
        return null;
   }
     
}
export default ItemCreatorFactory;