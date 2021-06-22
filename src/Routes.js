import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Search from "./components/search/search";

function SuperApp() {
  return (
    <BrowserRouter>
      <Search>
        <Switch>
          <Route exact path="/" component={App}></Route>
        </Switch>
      </Search>
    </BrowserRouter>
  );
}

export default SuperApp;
