import React, { useState } from 'react';

import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';
import {createCategory} from './helper/adminapicall';

const AddCategory = () => {

    const [ name, setName] = useState('');
    const [ error, setError] = useState(false);
    const [ success, setSuccess] = useState(false);

    const { user, token} = isAuthenticated();

    const goBack = () => {
        return(
            <div className="mt-2">
            <Link className="btn btn-sm btn-outline-dark mb-2 text-white rounded" to="/admin/dashboard" >Admin Home</Link>
            </div>
        );
    }

    const handleChange = event => {
        setError('');
        setName(event.target.value);
    }


    const onSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        //backend request
        createCategory(user._id, token, {name})
            .then( data => {
                if(data.error){
                    setError(true);
                }else{
                    setError('');
                    setSuccess(true);
                    setName('');
                }
            })
    }


    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category crested successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to create category</h4>
        }
    }
 
    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input 
                        type="text" 
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name} 
                        autoFocus 
                        required 
                        placeholder="For ex. Summer" 
                    />

                    <button className="btn btn-outline-info rounded" onClick={onSubmit} >Create Category</button>
                </div>
            </form>
        );
    }
    

    return (
        <Base title="Create a Category" description="Add new categories here" className="container bg-info p-4">
            {goBack()}
                <div className="row bg-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {myCategoryForm()} 
                    </div>
                </div>
        </Base>
    );
}

export default AddCategory;