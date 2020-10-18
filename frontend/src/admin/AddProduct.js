import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import Base from '../core/Base';
import { getAllCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';



const AddProduct  = () => {

    let history = useHistory()
;    const { user, token } = isAuthenticated();

    const [ values, setValues ] = useState({
        name: '',
        description:'',
        price:'',
        stock:'',
        categories: [],
        category:'',
        loading: false,
        error: '',
        createdProduct: '',
        getARedirect: false,
        formData: ''
    })

    const { 
        name, 
        description, 
        price, 
        stock, 
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        getARedirect, 
        formData
      } = values;

    const preload = () => {
      getAllCategories()
        .then( data => {
          if(data.error){
            setValues({ ...values, error: data.error})
          }else{
            setValues({ ...values, categories: data, formData: new FormData() })
          }
        })
    } ; 
    

    useEffect( () => {
      preload()
    }, []);

    const onSubmit = (event) => {
      event.preventDefault()

      setValues({...values, error:'', loading: true})
      createProduct(user._id, token,formData)
        .then( data => {
          if(data.error){
            setValues({...values, error: data.error})
          }else{
            setValues({
              ...values,
              name: '',
              description: '',
              price: '',
              photo: '',
              stock: '',
              getARedirect: true,
              loading: false,
              createdProduct: data.name
            })
          }
        })
    }

    const handleChange = name => event => {
      const value = name === 'photo' ? event.target.files[0] : event.target.value
      formData.set(name, value);
      setValues({...values, [name]: value});
    }

    const adminRedirect = () => {
      if(getARedirect){
        return(
          setTimeout(() => {
            history.push('/admin/dashboard')
          }, 4000)
        );
      } 
    }

    const successMessage = () => {
      
      return(
        <div className="alert alert-success mt-2"
          style={{display: createdProduct ? '' : 'none'}}
        >
          <h4>{createdProduct} created successfully. Redirecting to Dashboard...</h4>
       </div>
      ); 
    }

    const warningMessage = () => {
      return(
        <div className="alert alert-danger mt-2"
          style={{display: error ? '' : 'none'}}
        >
          <h4> Product creation failed</h4>
        </div>
      );
    }

    const loadingMessage = () => {
      return (
          loading && (
              <div className="d-flex justify-content-center">
              <div className="spinner-border"  role="status">
                  <span className="sr-only">Loading...</span>
              </div>
              </div>
          )
      );
  }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              { categories && 
                categories.map( (categories, index) => (
                  <option key={index} value={categories._id}>{categories.name}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );

    return(
        <Base 
            title="Add a Product" 
            description="Welcome to Product creation section" 
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-sm btn-outline-dark mb-2 text-white rounded" >Admin Home</Link>

            <div className="row bg-dark text-white rounded" >
                <div className="col-md-8 offset-md-2">
                    {loadingMessage()}
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                    {adminRedirect()}
                </div>
            </div>
        </Base>
    );
}

export default AddProduct;