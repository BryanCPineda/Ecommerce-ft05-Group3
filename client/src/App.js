
import React from "react";
import "./App.css";

import ProductCard2 from "./components/ProductCard2";




import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import FormCategories from './components/FormCategories/FormCategories';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CrudShow from "./components/CrudProducts/CrudShow";




function App() {


  return (
    <div>

      
      {/* <ProductCard2/> */}
      <Router>
        
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/admin/createCategories" component={FormCategories} />
          <Route exact path="/admin/product" component={CrudShow} />
        </Switch>
        {"aca va el footer"}
      </Router>

    </div>
  );

}

export default App;
