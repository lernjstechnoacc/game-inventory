import CraftPlatform from "../CraftPlatform";
import Inventory from "../Inventory";
import Store from "../Store";
import Wallet from "../Wallet";

interface ILogic {
    inventory: Inventory;
    wallet: Wallet;
    craftPlatform: CraftPlatform;
    store: Store;
}
export default ILogic;