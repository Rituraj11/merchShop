import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ffffff' }
    }else{
        return {color: '#d1d1d1'}
    }
}

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history,'/')} className="nav-link" to="/" >Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/user/dashboard')} className="nav-link" to="/user/dasboard" >Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/admin/dashboard')} className="nav-link" to="/admin/dashboard" >A. Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/cart')} className="nav-link" to="/cart" >Cart</Link>
            </li>
            
            { !isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item">
                <Link style={currentTab(history,'/signup')} className="nav-link" to="/signup" >SignUp</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,'/signin')} className="nav-link" to="/signin" >SignIn</Link>
                </li>
                </React.Fragment>
            )}
            { isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" 
                          onClick={ () => {
                                signout( () => {
                                    history.push('/')
                                })
                          }} >SignOut</span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);