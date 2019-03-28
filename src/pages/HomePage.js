import React from 'react';
import Card from '../components/Card';
import classNames from 'classnames';
import '../styles/HomePage.css';
import Loading from '../components/Loading';

const HomePage = ({ info, value, url, valueLoading, informationLoading }) => {
    const cardProps = info.map((cardProp, index) => Object.assign(cardProp, value[index]));
    const isReady = !valueLoading && !informationLoading;
    const cards = cardProps.map(cardProp => (
        <Card
            key={cardProp.name}
            name={cardProp.name}
            image={cardProp.image}
            price={cardProp.price}
            openDayPrice={cardProp.openDayPrice}
            lastUpdate={cardProp.lastUpdate}
            url={url}
        />
    ));
    return (
        <section className={classNames('home', { loading: !isReady })}>
            {cards}
            <Loading isReady={isReady} />
        </section>
    );
}

export default HomePage;