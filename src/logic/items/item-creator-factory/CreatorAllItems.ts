import Item from '../../Item';
import * as itemsCatalog from '../index'

function CreatorAllItems (): Item[]{
    let allITems: Item[] = [];

    let itemCatalogArray = Object.values(itemsCatalog);
    allITems = itemCatalogArray.map(item => item())

    return allITems;
}

export default CreatorAllItems;
     
