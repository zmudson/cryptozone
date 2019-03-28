import React from 'react';
import image from '../images/work.png';
import '../styles/EmptyPage.css';

const EmptyPage = () => {
    return (
        <section className='empty'>
            <div className="work">
                <img src={image} alt="work" />
            </div>
            <h1>The page is still work in progress, so some functions may not work or not work properly.</h1>
        </section>
    );
}

export default EmptyPage;