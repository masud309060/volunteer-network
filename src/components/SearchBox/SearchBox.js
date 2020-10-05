import React from 'react';
import background from '../../volunteer-network-main/screenshots/light-background1.png'
import './SearchBox.css'

const SearchBox = () => {
    return (
        <div>
            <div className="wrapper">
                <img src={background} alt=""/>
                <div className="search-box">
                        <h2>I GROW BY HELPING POEPLE IN NEED</h2>
                    <form>
                        <input type="text"  placeholder="search..."/>
                        <input type="submit" value="Search"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;