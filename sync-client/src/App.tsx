import Scene from "./components/Scene";
import { useFirestoreSubscription } from "./hooks/useFirestoreSubscription";
import { useStatusReporting } from "./hooks/useStatusReporting";

const App = () => {
  useStatusReporting();
  const dataLoaded = useFirestoreSubscription();
  return dataLoaded ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Scene />
    </div>
  ) : null;
};

export default App;
