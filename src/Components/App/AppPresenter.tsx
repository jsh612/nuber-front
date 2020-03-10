import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";
import Chat from "../../Routes/Chat";
import routes from "../../Routes/routes";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
);

const LoggedOutRoutes: React.FC = () => (
  <Switch>
    <Route path={routes.HOME} exact={true} component={Login} />
    <Route path={routes.PHONE_LOGIN} component={PhoneLogin} />
    <Route path={routes.VERIFY_PHOEN} component={VerifyPhone} />
    <Route path={routes.SOCIAL_LOGIN} component={SocialLogin} />
    <Redirect from={"*"} to={routes.HOME} />
  </Switch>
);

const LoggedInRoutes: React.FC = () => (
  <Switch>
    <Route path={routes.HOME} exact={true} component={Home} />
    <Route path={routes.RIDE} exact={true} component={Ride} />
    <Route path={routes.EDIT_ACCOUNT} exact={true} component={EditAccount} />
    <Route path={routes.SETTINGS} exact={true} component={Settings} />
    <Route path={routes.PLACES} exact={true} component={Places} />
    <Route path={routes.ADD_PLACE} exact={true} component={AddPlace} />
    <Route path={routes.FIND_ADDRESS} exact={true} component={FindAddress} />
    <Route path={routes.CHAT} exact={true} component={Chat} />
    <Redirect from={"*"} to={routes.HOME} />
  </Switch>
);

export default AppPresenter;
