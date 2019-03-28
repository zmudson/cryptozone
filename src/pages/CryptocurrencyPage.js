import React, { Component } from 'react';
import Stats from '../components/Stats';
import '../styles/CryptocurrencyPage.css'
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import classNames from 'classnames';

const source = 'www.coinmama.com';
const descriptions = {
    Ethereum: `You’ve probably heard of Ethereum as one of the biggest cryptocurrencies on the market right now. You may have heard about “smart contracts” and Solidity and are wondering what these are and what they have to do with Ethereum. Here, we’ll describe the basics of an Ethereum smart contract and how it relates to the Ethereum “world computer”. After the “what” of Ethereum, we’ll get into the “why”: why Ethereum’s founder, Vitalik Buterin, thought that Ethereum was necessary after Bitcoin. Finally, we’ll talk about what Ethereum is now and where it’s probably going in the future.`,
    Bitcoin: `If you’ve heard about cryptocurrency, you’ve probably heard about Bitcoin. Created by “Satoshi Nakamoto”, it is the first cryptocurrency and has set the standard for every cryptocurrency created since. Since its creation, Bitcoin has consistently had the highest value and is the most publicly-discussed cryptocurrency.
    Satoshi Nakamoto believed that there was a need for a decentralized cryptocurrency that was not dependent on or controlled by any centralized organization or group.To address this need, he designed Bitcoin and the blockchain technology upon which the Bitcoin cryptocurrency is based.`,
    Litecoin: `The first coin covered in our series is Litecoin (LTC) one of the earliest cryptocurrencies created in 2011 by the developer Charlie Lee. Litecoin has often been called the ‘silver’ to bitcoin’s ‘gold’ over the years and is a popular cryptocurrency. The virtual currency LTC is a fork of the bitcoin codebase but has a few differences. Block times are 2.5 minutes which makes LTC transactions faster and the protocol uses a different consensus mechanism called 'scrypt' rather than the 'SHA-256' proof-of-work miners use in Bitcoin. At the moment there are 61 million LTC in circulation and there is a maximum cap of 84 million coins. `,
}

class CryptocurrencyPage extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            prevScrollPosition: window.pageYOffset,
            visible: false,
        };
    }
    handleScroll() {
        const { prevScrollPosition: prevScroll } = this.state;
        const currentScroll = window.pageYOffset;
        const visible = currentScroll > prevScroll;
        if (this._isMounted) {
            this.setState({
                prevScrollPosition: currentScroll,
                visible,
            });
        }
    }
    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    render() {
        const { match, info, value, valueLoading, informationLoading } = this.props;
        const statsProps = info.map((statsProp, index) => Object.assign(statsProp, value[index]));
        const name = match.params.id;
        let number = -1;
        if (name === 'Ethereum') {
            number = 0;
        } else if (name === 'Bitcoin') {
            number = 1;
        } else if (name === 'Litecoin') {
            number = 2;
        }
        const isReady = !valueLoading && !informationLoading;
        return (
            <>
                {number > -1 ? (
                    <section className={classNames('cryptocurrency', { loading: !isReady })}>
                        {
                            isReady ? (
                                <>
                                    <h1 className={classNames({ hidden: !this.state.visible })}>{name}</h1>
                                    <div className="description">
                                        <p>{descriptions[name]}</p>
                                        <a href="https://www.coinmama.com/" target='_blank' rel='noopener noreferrer' >src: {source}</a>
                                    </div>
                                    <Stats
                                        abbr={statsProps[number].abbr}
                                        price={statsProps[number].price}
                                        openDayPrice={statsProps[number].openDayPrice}
                                        lowDayPrice={statsProps[number].lowDayPrice}
                                        highDayPrice={statsProps[number].highDayPrice}
                                        marketCap={statsProps[number].marketCap}
                                        supply={statsProps[number].supply}
                                        volume={statsProps[number].volumeDay}
                                        hashes={statsProps[number].netHashesPerSecond}
                                    />
                                </>) : <Loading isReady={isReady} />
                        }
                    </section >) : <Redirect to='/' />}
            </>
        );
    }
}

export default CryptocurrencyPage;
