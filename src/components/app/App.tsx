import {useState} from 'react';
import GameScreen from '../game-screen/GameScreen';
import HelloScreen from '../hello-screen/HelloScreen';
import useBuildLogic from "../../core/useBuildLogic";

//TODO think about components structure, what are the differences between a 'view'/'activity'/'page'/'section'/'screen' and a UI Component

function App() {
  const [isReadHelloScreen, setIsReadHelloScreen] = useState<boolean>(false);
  const logic = useBuildLogic();
  
  return (
    <div className=" max-w-7xl h-[100vh] mx-auto flex justify-center items-center">
      {(isReadHelloScreen) ? <GameScreen logic={logic}/> : <HelloScreen setIsReadHelloScreen={setIsReadHelloScreen}/>}
    </div>
  );
}

export default App;
