import { useEffect, useRef, useState } from "react";
import { clientDoc } from "./fire";
import Media from "./Media";
import { ClientModel, SceneModel } from "./models";

const App = () => {
  const [activeScene, setActiveScene] = useState<SceneModel | null>(null);
  const sceneUnsubscribe = useRef(() => {});
  useEffect(() => {
    const clientUnsubscribe = clientDoc.onSnapshot(async (clientSnapshot) => {
      sceneUnsubscribe.current();
      const sceneDoc = (clientSnapshot.data() as ClientModel).scene;
      
      const unsub = sceneDoc.onSnapshot(async (sceneSnapshot) => {
        if (!sceneSnapshot.exists) {
          return;
        }
        const scene = sceneSnapshot.data() as SceneModel;
        setActiveScene(scene);
      });
      sceneUnsubscribe.current = unsub;
    });
    return () => {
      clientUnsubscribe();
      sceneUnsubscribe.current();
    };
  }, []);

  return activeScene ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Media scene={activeScene} />
    </div>
  ) : null;
};

export default App;
