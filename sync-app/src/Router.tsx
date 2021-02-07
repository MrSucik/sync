import Authorization from "./Authorization/Authorization";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ClientPreview from "./Client/ClientAuthorization";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/auth" component={Authorization} />
    <Route path="/preview/:clientId" component={ClientPreview} />
  </Switch>
);

export default Router;
