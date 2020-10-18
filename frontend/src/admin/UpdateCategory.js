import React, { useState, useEffect } from 'react';

import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';
import { getCategory, updateCategory} from './helper/adminapicall';


const UpdateCategory = ({match}) => {

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

    
    const preload = categoryId => {
        getCategory(categoryId)
            .then( data => {
                if(data.error){
                    setError(true)
                }else{
                    setError('')
                    setName(data.name)
                    
                }
            })
    }

    useEffect( () => {
        preload(match.params.categoryId);
    }, [])

    // Submit request
    const onSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        //backend request
        updateCategory(match.params.categoryId, user._id, token, name)
            .then( data => {
                console.log(data)
                if(data.error){
                    setError(true);
                }else{
                    setError('');
                    setSuccess(true);
                    setName(name);
                }
            })
    }


    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to update category</h4>
        }
    }
 
    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Update the category</p>
                    <input 
                        type="text" 
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name} 
                        autoFocus 
                        required 
                    />

                    <button className="btn btn-outline-info rounded" onClick={onSubmit} >Update Category</button>
                </div>
            </form>
        );
    }
    

    return (
        <Base title="Update the Category" description="Update categories here" className="container bg-info p-4">
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

export default UpdateCategory;

