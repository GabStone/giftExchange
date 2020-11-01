import React from 'react';
import About from './pages/About';
import { Route, Switch } from "react-router-dom";
import GiftExchange from "./pages/GiftExchange";
import Redirect from "react-router-dom/es/Redirect";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={GiftExchange} />
            <Route exact path="/about" component={About} />
            <Redirect to="/" />
        </Switch>
    )
}
export default Routes;