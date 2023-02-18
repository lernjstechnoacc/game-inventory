import {useState} from 'react'
import useBildLogic from '../../logic/useBildLogic';
import InventoryView from '../inventory-view/InventoryView';
import StoreView from '../StoreView/StoreView';
import WalletView from '../wallet-view/WalletView';


const GameScreen = () => {
    const {inventory, store, wallet, craftPlatform} = useBildLogic();
    const [walletAmount, setWalletAmount] = useState<number>(wallet.coinAmount);
    const [currentDropName, setCurrentDropName] = useState('');
    const [craftPlatform1, sds ] = useState(craftPlatform);

    return (
        <div className='p-5 w-full  h-[90vh] flex'>
            <div className=' w-1/2 flex flex-col justify-around items-center'>
                <div className='small-block'>
                    <WalletView wallet={wallet} setWalletAmount={setWalletAmount} walletAmount={walletAmount}/>
                </div>
                <div className='small-block'>
                    <InventoryView inventoryClass={inventory} currentDropName={currentDropName} />
                </div>
            </div>
            <div className='w-1/2'>
                <StoreView wallet={wallet} walletAmount={walletAmount} store={store} setCurrentDropName={setCurrentDropName} />
            </div>
        </div>
    )
}

export default GameScreen;