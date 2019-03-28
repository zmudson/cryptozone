import React from 'react';
import '../styles/Footer.css'
import SocialMedia from '../components/SocialMedia';

const Footer = () => {
    return (
        <>
            <div className='footer'><span>&copy; Dominik Zmuda-Trzebiatowski</span></div>
            <SocialMedia />
        </>

    );
}

export default Footer;