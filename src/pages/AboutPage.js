import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/AboutPage.css';

const AboutPage = () => {
    return (
        <section className='about'>
            <div className="wrapper">
                <h1>What is Cryptozone?</h1>
                <p className='note'>Cryptozone is a site involving cryptocurrencies and informations from the world of Blockchain.</p>
                <div className="description">
                    <div> <NavLink to='/news'><i className="far fa-newspaper"></i></NavLink> <p>Articles</p></div>
                    <div><NavLink to='/'><i className="fas fa-database"></i></NavLink> <p>Data</p></div>
                    <div><NavLink to='/login'><i className="far fa-user"></i></NavLink> <p>Free Account</p></div>
                </div>
                <h1>We create the future</h1>
                <p className="note">We plan to develop even more features, like setting up your own cryptocurrency wallet. After logging in to your account you'll be able to manage and trade the cryptocurrencies you already own.</p>
            </div>
        </section>
    );
}

export default AboutPage;