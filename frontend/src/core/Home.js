import React from 'react';


import '../index.css';
import Base from './Base';


const Home = () => {
    return(
        <Base title="Home Page" description="Welcome to the Merch Shop">
            <h1 className="text-white">Hello frontend</h1>
        </Base>
    );
}

export default Home;