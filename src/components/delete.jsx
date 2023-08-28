import React,{ Component } from 'react';
import http from "./httpService";
// delete component is used for applying delete request from http url
class DeleteProduct extends Component {
 async componentDidMount(){
    const {id} = this.props.match.params;
    let response = await http.deleteApi(`/products/${id}`);
    this.props.history.push("/products");
 }

 render(){
    return ""
 }
}

export default DeleteProduct;