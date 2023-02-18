import {FC} from 'react'


interface HelloScreenProps {
    setIsReadHelloScreen: (type: boolean) => void;
}

const HelloScreen: FC<HelloScreenProps> = ({ setIsReadHelloScreen }) => {
    
    const onClickStartGame = () =>{
        setIsReadHelloScreen(true);
    }

    return (
        <div className='  w-[50%] p-6 flex flex-col items-center space-y-5'>
                <div className=" bg-zinc-800 shadow-inset-md rounded-xl p-4 ">
                    <div className="window-modal text-center">
                        <p>Hi everyone, this is my pet project on <span className='font-bold'>React</span> and <span className='font-bold'>TypeScript</span> This is a simple in-game inventory prototype where you can craft and collect items taken from the in-game store. It is possible to expand the number of items, also use one item to craft different items</p>
                        <br/>
                        <h3>Have fun ;)</h3>
                    </div>
                </div>

            <button onClick={onClickStartGame} className=' w-1/3 p-3 font-bold bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl hover:scale-95 hover:bg-gradient-to-tl'>Start Game</button>
        </div>
    )
}

export default HelloScreen;