import Item from '../../Item';
import * as itemsCatalog from '../index'

function ItemsFactory (): Item[]{
    let items: Item[] = [];

    let itemCatalogArray = Object.values(itemsCatalog);
    items = itemCatalogArray.map(item => item());
    return items;
}

export default ItemsFactory;
     
