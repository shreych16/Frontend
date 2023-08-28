import React,{ Component } from 'react';
import http from "./httpService";

class AddProduct extends Component {
    // state of all required data
    state = {
        product : {name: "",category: "",price: "", available: ""},
        categories : ['Electronics','Books','Home & Kitchen','Toys & Games'],
        status: [{display:"Available", value:"true"}, {display:"Unavailable", value:"false"}],
        edit:false,
    };


    async componentDidMount() {
        this.fetchData();
    }

    async componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props) this.fetchData();
    }

    // fetchData() to get data from server. If condition is working in put operation and else is working in post operation.
    async fetchData(){
        const {id} = this.props.match.params;
        console.log(id)
        if(id){
            console.log(id)
            let response = await http.get(`/products/${id}`);
            let {data} = response;
            console.log(data);
            this.setState({product: data[0], edit:true});
        }
        else{
            let product = {name: "",category: "",price: "", available: ""};
            product.available=="true" ?product.available=true:product.available=false;
            product.available=="false" ?product.available=false:product.available=true;
            product.price = product.price*1;
            console.log(product);
            this.setState({product:product,edit:false});
        }
    }

    // handleChange() is used for updation in data
    handleChange = (e) => {
        const {currentTarget : input} = e;
        let s1 = {...this.state};
        s1.product[input.name]=input.value;
        this.setState(s1);
    };

    // putData() is used for putting the data into database
    async putData(url,obj){
        let respone = await http.put(url,obj);
        let {data} = respone;
        console.log(data)
        this.props.history.push("/products");
    };

    // postData is used for posting the data into database
    async postData(url,obj){
        let respone = await http.post(url,obj);
        let {data} = respone;
        this.props.history.push("/products");
    };

    // onClick submit button handleSubmit() is working, it contains ternay operator in edit for calling putData() and postData() repectively
    handleSubmit = (e)=>{
        e.preventDefault();
        let {product,edit} = this.state;
        console.log(product,edit);
        this.setState({product:product});
        console.log(product);
        edit ? this.putData(`/products/${product.id}`,product) : this.postData("/products",product);
    };

    // showRadios() is used to show radio buttons
    showRadios = (label,arr,name,selVal) =>{
        return (
            <React.Fragment>
                <h6 className="form-check-label ">{label}</h6>
                    {
                        arr.map((opt) => (
                            <div className='form-check' key={opt}>
                                <input className='form-check-input' value={opt.value} type="radio" name={name} checked={selVal.toString() == opt.value} onChange={this.handleChange}/>
                                <label className='form-check-label'>{opt.value}</label>
                            </div>
                        ))
                    }
            </React.Fragment>
        )
     }


    render(){
        const {product,categories,status} = this.state;
        const {name,category,price,available} = product;
        const {edit} = this.state;
        console.log(product)
        return (
            <div className='container'>
                {edit ? <h4 className='text-center m-3'>Edit Product Details</h4> : <h4 className='text-center m-3'>Add Product Details</h4> }
                
                <div className='form-group'>
                    <label>Product Name</label>
                    {edit ? <input type="text" className='form-control' id='name' name='name' placeholder='Enter Product Name' value={name} onChange={this.handleChange} disabled /> : <input type="text" className='form-control' id='name' name='name' placeholder='Enter Product Name' value={name} onChange={this.handleChange} />}
                </div><br />
                <div className='form-group'>
                <label>Category</label>
                    <select className='form-control' name="category" value={category} onChange={this.handleChange}>
                        <option value="">Select Category</option>
                        {categories.map((pr) => (
                            <option key={pr}>{pr}</option>
                        ))}
                    </select>
                </div><br />
                <div className='form-group'>
                    <label>Price</label>
                    <input type="number" className='form-control' id='price' name='price' placeholder='Enter Product Price' value={price} onChange={this.handleChange} />
                </div><br />
                <div className='col-12 my-2'>
                    {this.showRadios("Product Status",status,"available",available)}
                </div><br />
                {edit ? <button className='btn btn-primary ' onClick={this.handleSubmit}>Update</button> : <button className='btn btn-primary ' onClick={this.handleSubmit}>Submit</button>}
            </div>
        )
    }
}

export default AddProduct;