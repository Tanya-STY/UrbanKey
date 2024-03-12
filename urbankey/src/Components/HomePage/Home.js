import React, { useState } from 'react';
import '../HomePage/Home.css';
import { Link } from 'react-router-dom';
import urbanKeyLogo from '../Images/urbankey_logo.png';

const Home = () => {

    const [search, setSearch] = useState('');

    return (
        <div>
            <div className='header'></div>
    
            <div className='houseSlogan'>
                Your dream house is here.
            </div>
            <div className='searchArea'>
                <input
                    className="inputSearch"
                    type="text"
                    id="key"
                    value={search} //search input into the variable
                    //onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                    required
                />
            </div>
            <h5 className='homeHeadings'>Featured Properties</h5>
            <div className='homeSection'>
                <div className="container">
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                </div>
            </div>
            <h5 className='homeHeadings'>Featured Rental</h5>
            <div className='homeSection'>
                <div className="container">
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                    <div className="box">import property info later</div>
                </div>
            </div>
            <div className='homeSection'>
                <div className='wideBox'>
                    <br/>
                    <p className='homeSubHeading'>Search Your Dream House On The Map</p>
                    <p className='homeBody'>Find the house you are looking for easily according to location information.</p>
                    <button type="button" className='homeMapButton'>Search on Map</button>
                </div>
            </div>
            <h5 className='homeHeadings'>Featured Property</h5>
            <div className='homeSection'>
                <div className='wideBox'>
                    <br/>
                    <p className='homeSubHeading'>ProManage Property</p>
                    <p className='homeBody'>The privileged location in Centre-ville region in the south of Montreal city.<br/>The Property is close to many hotels, hospitals and commercial centers...</p>
                    <button type="button" className='homeViewPropertyButton'>View Property</button>
                </div>
                <div className="container">
                    <div className="box">
                        <br/>
                        <p className='homeSubHeading'>Prime Property Management</p>
                        <p className='homeBody'>The privileged location in Centrle-ville region in the west of Montreal city.<br/>The project is close to many hotels, hospitals and commercial centers...</p>
                        <button type="button" className='homeViewPropertyButton'>View Property</button>
                    </div>
                    <div className="box">
                        <br/>
                        <p className='homeSubHeading'>MasterKey Property</p>
                        <p className='homeBody'>The privileged location in Centrle-ville region in the west of Montreal city.<br/>The project is close to many hotels, hospitals and commercial centers...</p>
                        <button type="button" className='homeViewPropertyButton'>View Property</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;