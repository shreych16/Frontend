import React,{Component} from "react";
import {Link} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';


class Navbar extends Component {

    state = {
        options: ["view products", "add new product"],
    };

    render(){
        const {options} = this.state;

        // it is bootstrap navbar code with react-bootstrap NavDropdown option
        return(
            <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-primary">
                <Link className="navbar-brand" to="/" style={{marginLeft:10}}>Products</Link>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Products"
                            menuVariant="dark"
                        >
                            {options.map((pr, index) => 
                                <Link key={index} className="dropdown-item" to={`/products/${pr.substring(0,4)}`}>{pr}</Link>
                            )}     
                        </NavDropdown>
                        
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;