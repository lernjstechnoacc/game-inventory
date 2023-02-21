import {useState} from 'react';
import useBildLogic from '../../logic/useBildLogic';
import GameScreen from '../game-screen/GameScreen';
import HelloScreen from '../hello-screen/HelloScreen';


function App() {
  const [isReadHelloScreen, setIsReadHelloScreen] = useState<boolean>(false);
  const logic = useBildLogic();
  
  return (
    <div className=" max-w-7xl h-[100vh] mx-auto flex justify-center items-center">
      {(isReadHelloScreen) ? <GameScreen logic={logic}/> : <HelloScreen setIsReadHelloScreen={setIsReadHelloScreen}/>}
    </div>
  );
}

export default App;
