import React,{Component} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";
import http from "./httpService";
import LeftPanel from "./leftPanal";
import "./style.css";

// it is a main page for showing all products
class Products extends Component{
     // state of all required data
    state = {
        data: [],
        status: [{display:"Available", value:true}, {display:"Unavailable", value:false}],
        categories : ["Electronics","Books","Home & Kitchen","Toys & Games"],
        sorts: ["By Price(Low to High)","By Price(High to Low)","By Name(A to Z)","By Name(Z to A)"],
        max:""
        };

// fetchData() to get data from server.
    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        // console.log(queryParams)
        let searchString = this.makeSearchString(queryParams);
        let response = queryParams ? await http.get(`/products?${searchString}`) : await http.get("/products");
        console.log(response)
        let {data}= response;
        this.setState({data:data,});
    }

    componentDidMount(){
       this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps!== this.props)
            this.fetchData();
    }

    // for applying changes in url
    handleOptionChange = (options) => {
        this.callURL("/products",options);
    }

    // callURL() for creating urls
    callURL = (url,options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname : url, search: searchString
        });
    };

    // makeSearchString() is used for creating query parameters
    makeSearchString = (options) => {
        let {available,category, sort, price} = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr,'available',available);
        searchStr = this.addToQueryString(searchStr,'sort',sort);
        searchStr = this.addToQueryString(searchStr,'price',price);
        searchStr = this.addToQueryString(searchStr,'category',category);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => 
    paramValue? str? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    

    render(){
        const {categories,sorts,status,max,data=[]} = this.state;
        let queryParams = queryString.parse(this.props.location.search);
        console.log(max)

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LeftPanel options={queryParams} categories={categories} status={status} sorts={sorts} onOptionChange = {this.handleOptionChange} /> {/* leftPanel props for passing data and and functions in leftPanel component */}
                    </div>
                    <div className="col-9">
                    <h3 className="hover text-center">Product Page</h3>
                        <div className="row " > 
                            {
                            data.map(pr=> 
                                <div className="col-5 border border-info border-3 rounded m-3 hover shadow" key={pr.id} style={{}}>
                                    <img src="https://www.ctvnews.ca/polopoly_fs/1.1064870.1416574677!/httpImage/image.jpeg_gen/derivatives/landscape_1020/image.jpeg" className="img-fluid rounded-top border border-2 border-dark mt-1" alt="Responsive image"></img>
                                    <h2 className="text-center" style={{fontFamily:"initial"}}>{pr.name}</h2>    
                                    <b className="text-dark">Category:- {pr.category}</b><br />
                                    <b className="text-dark">Price:- ₹{pr.price}</b><br />
                                    <b className="text-dark">Status:- { pr.available ? <span className="text-success">Available</span>:<span className="text-danger">Currently Unavailable</span> }</b><br />
                                    <Link className="text-primary text-decoration-none" style={{fontStyle:"oblique"}} to={`/product/${pr.id}`}>View more →</Link>
                                </div> 
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
            
        );
    };
};
export default Products;