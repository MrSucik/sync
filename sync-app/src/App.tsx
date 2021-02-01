import Authorization from "./Authorization/Authorization";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import { useAuthorization } from "./Authorization/useAuthorization";
import Loading from "./components/Loading";
import ClientPreview from "./Preview/ClientPreview";

const App = () => {
  const { loading } = useAuthorization();
  return loading ? (
    <Loading />
  ) : (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/auth" component={Authorization} />
      <Route path="/preview/:clientId" component={ClientPreview} />
    </Switch>
  );
};

export default App;
