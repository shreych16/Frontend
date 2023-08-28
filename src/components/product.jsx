import React,{Component} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";
import http from "./httpService";

// it is single product page for showing seperate products 
// it show product name, category , price, status, and im using loram*5 for product discription
class Product extends Component{
    state = {product: {}};

    async componentDidMount(){
        let {id} =this.props.match.params;
        let response = await http.get(`/products/${id}`);
        let {data }= response;
        console.log(data);
        this.setState({product : data[0]});
    }
    render(){
        const {product} = this.state;
        console.log(product);
        return (
            <div className='container' style={{fontFamily:"sans-serif"}}>
                <h6 style={{color:"darkviolet"}}>Single Product</h6><br />
                <h3>{product.name}</h3> <br />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet sit temporibus obcaecati? Nobis accusantium tenetur laboriosam exercitationem rerum, sint esse doloribus id, eaque illum, libero voluptates possimus quod fugit. Molestiae.
                Rem suscipit repellendus consequuntur dolorum tempore omnis sed maiores voluptatem adipisci ipsum tenetur praesentium dicta, corrupti cumque libero ullam et deserunt, odit expedita distinctio ipsa quibusdam. Aspernatur amet ipsum dignissimos.
                Assumenda molestias magnam voluptatibus vitae, vero, quod dicta veniam enim totam voluptatum vel labore odio obcaecati voluptate fuga dolore placeat, in voluptas amet dignissimos dolorum beatae natus. Animi, iste nemo.
                Magnam cum minus ipsam odio ullam consequatur magni labore. Molestias corporis pariatur magnam eos fuga magni, a numquam accusamus? Enim sit sint vero consequatur, cum inventore dicta itaque dolor! Voluptatum?
                Dolorem sed architecto distinctio tempore saepe debitis esse incidunt libero, voluptate earum reiciendis quasi consequuntur mollitia voluptatibus minus nisi laboriosam facilis dignissimos cumque animi placeat dolor? Accusamus ab suscipit similique?</p>
                <b>Category :</b> {product.category} <br />
                <b>Price :</b> ₹{product.price} <br />
                <b>Status :</b> {product.available ? <span className="text-success">Currectly in Stock</span> : <span className="text-danger">Out of Stock</span>} <br />
                <button className="btn btn-warning m-3" title="Update product"><Link className="text-decoration-none text-white" to={`/products/${product.id}/edit`}>Update Product</Link></button>
                <button className="btn btn-danger m-3"><Link className="text-decoration-none text-white" to={`/products/${product.id}/delete`}>Remove Product</Link></button>
                <button className="btn btn-primary m-3"><Link className="text-decoration-none text-white" to={"/"}>Back</Link></button>

            </div>
        )
    }
};
export default Product;