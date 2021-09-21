import { Route, Switch } from "react-router-dom";
import { ApiProvider } from './context/ApiContext';
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <ApiProvider>
      <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer hideProgressBar theme="dark" newestOnTop={true} position="bottom-left"/>
      </div>
    </ApiProvider>
  );
}

export default App;
