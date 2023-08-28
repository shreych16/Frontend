import React,{ Component, useState } from 'react';
import { Col } from 'react-bootstrap';
import {Link} from "react-router-dom";
import RangeSlider from 'react-bootstrap-range-slider';


class LeftPanel extends Component {
    // handleChange() is used for changes in data

    handleChange = (e) => {
        let {currentTarget : input} = e;
        let options = {...this.props.options};
        // console.log(input);
        { input.name == "category" ? options[input.name] = this.updatesCB(options[input.name],input.checked,input.value) : options[input.name]=input.value };
        console.log(options)
        this.props.onOptionChange(options);
    };

    updatesCB = (inpValue,checked,value=[]) => {
        let inpArr = inpValue ? inpValue.split(",") : [];
        if(checked) inpArr.push(value.substring(0,4));
        else {
            let index = inpArr.findIndex((ele) => ele.substring(0,4) === value.substring(0,4));
            if(index >= 0) inpArr.splice(index,1);
        }
        return inpArr.join(",");
    };

        // makeCheckboxes() is used to show check boxes buttons

    makeCheckboxes = (arr, value, name, label) => (
        <>
        <b className='form-check-label font-weight-bold'>{label}</b>
        {arr.map((opt) =>( 
            <div className="form-check" key={opt}>
                <input className='form-check-input' type="checkbox" name={name} value={opt} checked={value.find((val) => val === opt)} onChange={this.handleChange} />
                <label className='form-check-label'>{opt}</label>
            </div>
        ))}
        </>
    );
    
    // showRadios() is used to show radio buttons
    showRadios = (label,arr,name,selVal) =>{
        return (
            <React.Fragment>
                <b className="form-check-label ">{label}</b>
                    {
                        arr.map((opt) => (
                            <div className='form-check' key={opt.display}>
                                <input className='form-check-input' value={opt.display} type="radio" name={name} checked={selVal === opt.display} onChange={this.handleChange}/>
                                <label className='form-check-label'>{opt.display}</label>
                            </div>
                        ))
                    }
            </React.Fragment>
        )
     }

    // makeDropDown() is used to show DropDown
    makeDropDown = (arr, value, name, label) => (
        <div className='form-group'>
             {console.log(arr, value, name, label)}
                   <select className='form-control' name={name} value={value} onChange={this.handleChange}>
                        <option value="">{label}</option>
                        {arr.map((pr,index) => (
                            <option key={index} >{pr}</option>
                        ))}
                    </select>
                </div>
    );

    
    render(){
        let {sort="",available="",price="",category=""} =this.props.options;
        let {sorts,categories,status} = this.props;
        
        return (
            <div className='row'>
                <div className='col-12 my-2'>
                    {this.makeDropDown(sorts,sort,"sort","Select Sort")}
                </div>
                <div className='col-12 my-2'>
                    {this.makeCheckboxes(categories, category.split(","), "category", "Categories")}
                </div>
                
                <div className='col-12 my-2'> 
                    <b className='form-check-label font-weight-bold'>Select Max Price</b><br />
                    <Col xs="10">
                        <RangeSlider value={price} name="price" max={5000} min={0} onChange={this.handleChange} tooltip='auto' />  {/* It is used for showing range slider for price filteration */}
                    </Col>
                </div>
                <div className='col-12 my-2'>
                    {this.showRadios("Product Status",status,"available",available)}
                </div>
                <div>
                    <br /><button className='btn btn-primary btn-sm '>
                        <Link className="text-decoration-none text-white" to="/" >Clear Filters</Link>  {/* it is used for removing all the applied filters */}
                    </button>
                </div>
            </div>
        )
    }
}

export default LeftPanel;