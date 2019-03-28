import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NewsPage from '../pages/NewsPage';
import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';
import CryptocurrencyPage from '../pages/CryptocurrencyPage';
import EmptyPage from '../pages/EmptyPage';
const APIURL = 'https://www.cryptocompare.com';

const Page = ({ articles, info, value, login, articlesLoading, valueLoading, informationLoading }) => {
    return (
        <Switch>
            <Route exact path='/' render={() => (<HomePage
                info={info}
                value={value}
                url={APIURL}
                informationLoading={informationLoading}
                valueLoading={valueLoading}
            />)}
            />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/news' render={() => (<NewsPage
                articles={articles}
                articlesLoading={articlesLoading}
            />)} />
            <Route exact path='/login' render={() => (<LoginPage
                login={login}
            />)} />
            <Route exact path='/login/:id' component={EmptyPage} />
            <Route exact path='/contact' component={ContactPage} />
            <Route path='/cryptocurrency/:id' render={({ match }) => (<CryptocurrencyPage
                info={info}
                value={value}
                informationLoading={informationLoading}
                valueLoading={valueLoading}
                match={match}
            />)} />
            <Route render={() => <Redirect to='/' />} />
        </Switch>
    );
}

export default Page;