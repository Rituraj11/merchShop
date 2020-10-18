import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Base from '../core/Base';
import {signin, authenticate, isAuthenticated} from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect} = values;
    const { user } = isAuthenticated();


    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();

        setValues({ ...values, error: false, loading: true});
        signin({email, password})
            .then( data => {
                if(data.error){
                    setValues({ ...values, error: data.error, loading: false});   
                }else{
                    authenticate( data, () => {
                        setValues({ ...values, didRedirect: true});
                    });
                }
            })
            .catch(error)
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
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

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }} >
                    {error}
                    </div>
                </div>
            </div>
        );
        
    }

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input value={email} onChange={handleChange('email')} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} onChange={handleChange('password')} className="form-control" type="password" />
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign In" title="A page for User sign in">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        
        </Base>
    );
};

export default Signin;