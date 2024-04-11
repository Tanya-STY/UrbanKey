import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import urbanKeyLogo from '../Images/urbankey_logo.png';
import home_search_background from '../Images/home_search_background.jpg';
import home_phone from '../Images/home_phone.jpg';
import home_building from '../Images/home_building.png';
import home_building2 from '../Images/home_building2.png';
import home_building3 from '../Images/home_building3.png';
import condo1 from '../Images/condo1.jpg';
import condo2 from '../Images/condo2.jpg';
import condo3 from '../Images/condo3.jpg';
import condo4 from '../Images/condo4.jpg';
import condo5 from '../Images/condo5.jpg';
import condo6 from '../Images/condo6.jpg';
import condo7 from '../Images/condo7.jpg';
import condo8 from '../Images/condo8.jpg';
import '@fortawesome/fontawesome-free/css/all.css';


const Home = () => {

    const [search, setSearch] = useState('');

    return (
        <div>
            <header className='header'> {/* Changed this div to header */}
                {/* Any header content goes here */}
            </header>
            {/* Rest of your component */}

            <div className='picture_search'>
                <img src={home_search_background} alt="background image" />
                <div className='houseSlogan'>
                    Your dream house is here.
                    <br /><br />
                    <div className='searchArea'>
                        <input
                             className="inputSearch"
                             type="text"
                             id="key"
                             value={search} // Bind this value to your component's state
                             onChange={(e) => setSearch(e.target.value)} // Add this line to handle changes
                             placeholder='Search...'
                             required
                        />
                    </div>
                </div>
            </div>
            
            <h5 className='homeHeadings'>Featured Properties</h5>
            <div className='homeSection'>
                <div className="container">
                    <div className="box"> 
                        <img src={condo1} alt="condo1" />
                    </div>
                    <div className="box">
                        <img src={condo2} alt="condo2" />
                    </div>
                    <div className="box">
                        <img src={condo3} alt="condo3" />
                    </div>
                    <div className="box">
                        <img src={condo4} alt="condo4" />
                    </div>
                </div>
            </div>
            <h5 className='homeHeadings'>Featured Rental</h5>
            <div className='homeSection'>
                <div className="container">
                <div className="box"> 
                        <img src={condo5} alt="condo5" />
                    </div>
                    <div className="box">
                        <img src={condo6} alt="condo6" />
                    </div>
                    <div className="box">
                        <img src={condo7} alt="condo7" />
                    </div>
                    <div className="box">
                        <img src={condo8} alt="condo8" />
                    </div>
                </div>
            </div>
            <div className='homeSection'>
                <div className='wideBox'>
                    <div className='homeContent' >
                        <br/>
                        <p className='homeSubHeading'>Search Your Dream House On The Map</p>
                        <p className='homeBody'>Find the house you are looking for easily according to location information.</p>
                        <button type="button" className='homeMapButton'>Search on Map</button>
                    </div>
                    <img src={home_phone} alt="phone_picture" className='phoneImage'/>
                </div>
                
            </div>
            <h5 className='homeHeadings'>Featured Property</h5>
            <div className='homeSection'>
                <div className='wideBox'>
                    <div className='homeContent'>
                        <br/>
                        <p className='homeSubHeading'>ProManage Property</p>
                        <p className='homeBody'>The privileged location in Centre-ville region in the south of Montreal city. <br/> The Property is close to many hotels, hospitals and commercial centers...</p>
                        <button type="button" className='homeViewPropertyButton'>View Property</button>
                        <br/>
                    </div>
                    <img src={home_building} alt="building" className='home_image' />
                </div>
                <br/>
                <div className="container">
                    <div className="mediumBox">
                        <div className='homeContent'>
                            <p className='homeSubHeading'>Prime Property Management</p>
                            <p className='homeBody'>The privileged location in Centre-ville region in the west of Montreal city. The project is close to many hotels, hospitals and commercial centers...</p>
                            <button type="button" className='homeViewPropertyButton'>View Property</button>
                            <br/>
                        </div>
                        <img src={home_building3} alt="building3" className='home_image' />
                    </div>
                    <div className="mediumBox">
                        <div className='homeContent'>
                            <p className='homeSubHeading'>MasterKey Property</p>
                            <p className='homeBody'>The privileged location in Centre-ville region in the west of Montreal city. The project is close to many hotels, hospitals and commercial centers...</p>
                            <button type="button" className='homeViewPropertyButton'>View Property</button>
                            <br/>
                        </div>
                        <img src={home_building2} alt="building2" className='home_image' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;