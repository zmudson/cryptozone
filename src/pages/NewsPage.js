import React from 'react';
import '../styles/NewsPage.css';
import classNames from 'classnames';
import Article from '../components/Article';
import Loading from '../components/Loading';

const NewsPage = ({ articles, articlesLoading }) => {
    const news = articles.map(article => <Article key={article.id} data={article} />)
    const isReady = !articlesLoading;
    return (
        <>
            <header className='heading'>
                <h1>Articles about cryptocurrencies</h1>
            </header>
            <section className={classNames('news', { loading: !isReady })}>
                {news}
                <Loading isReady={isReady} />
            </section>
        </>
    );
}

export default NewsPage;
