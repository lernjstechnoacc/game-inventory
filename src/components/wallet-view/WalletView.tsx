import {useEffect, useState, FC} from 'react'
import Wallet from '../../core/Wallet';


interface WalletViewProps {
    wallet: Wallet;
}

const WalletView: FC<WalletViewProps> = ({wallet}) => { 
    const [walletAmount, setWalletAmount] = useState<number>(wallet.coinAmount);
    useEffect(()=>{
        setInterval(addCoinToWallet, 1000);
        // eslint-disable-next-line
    },[])


    const addCoinToWallet = (amount: number = 1) => {
        wallet.addAmount(amount);
        setWalletAmount(wallet.coinAmount)
    }

    return (
        <div className='flex flex-col w-full'>
            <h2 className='h2-title mb-7'>Wallet</h2>
            <div className='flex w-full justify-around items-center'>
                <div>{`Amount  ${wallet.coinName} :`}</div>
                <div className='bg-black/70 rounded-xl shadow-inset-md p-2 px-5'>{walletAmount}</div>
            </div>
        </div>
    )
}

export default WalletView;