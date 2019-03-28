import React from 'react';
import '../styles/ContactPage.css';
import image from '../images/laptop.png';
import TypingText from '../components/TypingText';
import Typist from 'react-typist';

const ContactPage = () => {
    return (
        <section className='contact'>
            <div className="contact-box">
                <TypingText text='Tel: +48 667 805 238' className='top' />
                <img src={image} alt="laptop" />
                <Typist
                    avgTypingSpeed={40}
                    startDelay={1000}
                >
                    <a href="mailto:cryptozone@gmail.com">cryptozone@gmail.com</a>
                </Typist>
            </div>
        </section>
    );
}

export default ContactPage;
