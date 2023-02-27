import { useState } from "react";
import ILogic from "../../core/interface/ILogic";
import useBuildLogic from "../../core/useBuildLogic";

import GameScreen from "../game-screen/GameScreen";
import HelloScreen from "../hello-screen/HelloScreen";

function App() {
  const [isReadHelloScreen, setIsReadHelloScreen] = useState<boolean>(false);
  const logic: ILogic = useBuildLogic();

  return (
    <div className=" max-w-7xl h-[100vh] mx-auto flex justify-center items-center">
      {isReadHelloScreen ? (
        <GameScreen logic={logic} />
      ) : (
        <HelloScreen setIsReadHelloScreen={setIsReadHelloScreen} />
      )}
    </div>
  );
}

export default App;
