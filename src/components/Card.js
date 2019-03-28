import React from 'react';
import '../styles/Card.css';
import { NavLink } from 'react-router-dom';

const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
const Card = ({ name, image, price, openDayPrice, lastUpdate, url }) => {
    const percent = ((price / openDayPrice - 1) * 100).toFixed(2);
    let percentStyle = {
        color: '',
    }
    let arrow = '';
    if (percent > 0) {
        percentStyle.color = 'green';
        arrow = decodeHtml('&#8599;');
    } else if (percent < 0) {
        percentStyle.color = 'red';
        arrow = decodeHtml('&#8600;');
    }
    const time = new Date(lastUpdate * 1000).toLocaleTimeString();
    return (
        <>
            <div className='card'>
                <img className='crypto' src={url + image} alt={name} />
                <div className="info">
                    <h1>{name}</h1>
                    <h2><sup>$</sup>{price}</h2>
                    <h2 style={percentStyle}><sup>{arrow}</sup>{percent + '%'}</h2>
                    <h2>last update</h2>
                    <h2>{time}</h2>
                    <div className="read"><NavLink to={'/cryptocurrency/' + name}>Read more</NavLink></div>
                </div>
            </div>
        </>
    );
}

export default Card;
