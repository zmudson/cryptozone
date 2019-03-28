import React, { Component } from 'react';
import '../styles/App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Page from './Page';
import Navbar from './Navbar';
import Footer from './Footer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesData: [],
            informationData: [],
            valueData: [],
            userData: [],
            articlesLoading: true,
            informationLoading: true,
            valueLoading: true,
        }
    }
    fetchDataInfo() {
        this.setState({
            informationData: [],
            informationLoading: true,
        });
        fetch('https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=ETH,BTC,LTC&tsym=XMR')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.Data.map(data => (
                {
                    abbr: data.CoinInfo.Name,
                    name: data.CoinInfo.FullName,
                    image: data.CoinInfo.ImageUrl,
                    supply: data.ConversionInfo.Supply,
                    netHashesPerSecond: data.CoinInfo.NetHashesPerSecond,
                }
            )))
            .then(informationData => {
                this.setState({
                    informationData,
                    informationLoading: false,
                });
                localStorage.setItem('informationDate', Date.now());
            })
            .catch(error => {
                console.log('parsing failed', error);
                setTimeout(this.fetchDataInfo.bind(this), 3000);
            });
    }
    fetchDataValue() {
        this.setState({
            valueData: [],
            valueLoading: true,
        })
        const names = ['ETH', 'BTC', 'LTC'];
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,BTC,LTC&tsyms=USD')
            .then(response => response.json())
            .then(parsedJSON => (
                names.map(name => (
                    {
                        price: parsedJSON.RAW[name].USD.PRICE,
                        openDayPrice: parsedJSON.RAW[name].USD.OPENDAY,
                        lowDayPrice: parsedJSON.RAW[name].USD.LOWDAY,
                        highDayPrice: parsedJSON.RAW[name].USD.HIGHDAY,
                        lastUpdate: parsedJSON.RAW[name].USD.LASTUPDATE,
                        marketCap: parsedJSON.RAW[name].USD.MKTCAP,
                        volumeDay: parsedJSON.RAW[name].USD.VOLUMEDAYTO,
                    }
                ))))
            .then(valueData => {
                this.setState({
                    valueData,
                    valueLoading: false,
                });
                localStorage.setItem('valueDate', Date.now());
            })
            .catch(error => {
                console.log('parsing failed', error);
                setTimeout(this.fetchDataValue.bind(this), 3000);
            })
    }
    fetchDataArticles() {
        this.setState({
            articlesLoading: true,
            articlesData: [],
        });
        fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN ')
            .then(response => response.json())
            .then(parsedJSON => {
                const articlesData = parsedJSON.Data.slice(0, 10);
                this.setState({
                    articlesData,
                    articlesLoading: false,
                });
                localStorage.setItem('articlesDate', Date.now());
            })
            .catch(error => {
                console.log('parsing failed', error);
                setTimeout(this.fetchDataArticles.bind(this), 3000);
            })
    }
    fetchDataUser() {
        fetch('https://randomuser.me/api/?results=1&password=upper,lower,number,8-16')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results.map(data => (
                {
                    username: data.login.username,
                    password: data.login.password,
                }
            )))
            .then(userData => {
                this.setState({
                    userData,
                });
                console.log('login: ' + userData[0].username, 'hasło: ' + userData[0].password);
            })
            .catch(error => console.log('parsing failed', error))
    }
    checkDataAge(name) {
        const refreshTime = 1;
        const prevDate = localStorage.getItem(name);
        const date = prevDate && new Date(parseInt(prevDate));
        const now = new Date();
        const dataAge = Math.round((now - date) / (60 * 1000));
        const tooOld = dataAge >= refreshTime;
        return tooOld;
    }
    componentWillMount() {
        localStorage.getItem('articlesData') && this.setState({
            articlesData: JSON.parse(localStorage.getItem('articlesData')),
            articlesLoading: false,
        });
        localStorage.getItem('informationData') && this.setState({
            informationData: JSON.parse(localStorage.getItem('informationData')),
            informationLoading: false,
        });
        localStorage.getItem('valueData') && this.setState({
            valueData: JSON.parse(localStorage.getItem('valueData')),
            valueLoading: false,
        });
    }
    componentDidMount() {
        const informationAge = this.checkDataAge('informationDate');
        const valueDataAge = this.checkDataAge('valueDate');
        const articlesAge = this.checkDataAge('articlesDate');
        this.fetchDataUser();
        if (informationAge) {
            this.fetchDataInfo();
        }
        if (valueDataAge) {
            this.fetchDataValue();
        }
        if (articlesAge) {
            this.fetchDataArticles();
        }
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('articlesData', JSON.stringify(nextState.articlesData));
        localStorage.setItem('informationData', JSON.stringify(nextState.informationData));
        localStorage.setItem('valueData', JSON.stringify(nextState.valueData));
    }
    render() {
        const { articlesData, informationData, valueData, userData, articlesLoading, valueLoading, informationLoading } = this.state;
        return (
            <Router>
                <div className='appWrap'>
                    <Navbar />
                    <Route render={({ location }) => (
                        <TransitionGroup className='transition'>
                            <CSSTransition
                                timeout={450}
                                classNames='fade'
                                key={location.pathname}
                            >
                                <main onLoad={() => window.scrollTo(0, 0)}>
                                    <Page
                                        articles={articlesData}
                                        info={informationData}
                                        value={valueData}
                                        login={userData}
                                        articlesLoading={articlesLoading}
                                        valueLoading={valueLoading}
                                        informationLoading={informationLoading}
                                    />
                                </main>
                            </CSSTransition>
                        </TransitionGroup>
                    )} />
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;