import React from 'react';

import '../index.css';
import Menu  from './Menu';

const Base = ({
    title="My title",
    description="my description",
    className="bg-dark text-white p-3",
    children
}) => {
    return(
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
            <div className={className}>{children}</div>
            </div>

            <footer className="footer bg-dark mt-auto py-2">
                <div className="containter-fluid bg-success text-white text-center py-2">
                    <h4>If you have any query , feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">A <span className="text-white">MERN</span> project</span>
                </div>
            </footer>
        </div>
    );
}

export default Base;