import React from 'react';
import '../styles/SocialMedia.css';
import SocialMediaLink from './SocialMediaLink';

const SocialMedia = () => {
    return (
        <ul className='social-media'>
            <SocialMediaLink
                URL='https://www.facebook.com/dominik.zmudatrzebiatowski.3'
                icon='fab fa-facebook-f'
                target='_blank'
            />
            <SocialMediaLink
                URL='https://www.instagram.com/zmuda04/'
                icon='fab fa-instagram'
                target='_blank'
            />
            <SocialMediaLink
                URL='mailto:dominik.zmuda_trzebiatowski@wp.pl'
                icon='fas fa-at'
                target=''
            />
        </ul>
    );
}

export default SocialMedia;
