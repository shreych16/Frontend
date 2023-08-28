import React,{ Component } from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import Navbar from './navbar';
import AddProduct from './addProduct';
import Product from './product';
import DeleteProduct from './delete';
import Products from './products';


class MainComponent extends Component {
    render() {
        // It is main component which contains all the routes
        return (
            <div className=''>
                <Navbar />
                <Switch>
                    <Route path="/products/:id/edit" component={AddProduct} />
                    <Route path="/products/:id/delete" component={DeleteProduct} />
                    <Route path="/products/add " component={AddProduct} />
                    <Route path="/products/view" component={Products} />
                    <Route path="/products" component={Products} />   
                    <Route path="/product/:id" component={Product} />
                    <Redirect from='/' to='/products'/>
                </Switch>
            </div>
        )
    }
}

export default MainComponent;