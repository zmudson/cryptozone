import React from 'react';
import '../styles/Article.css';

const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
const Article = ({ data }) => {
    const letters = 500;
    let text = decodeHtml(data.body);
    if (text.length > letters) {
        text = text.slice(0, letters) + '...';
    }
    return (
        <article className='news'>
            <div className="description">
                <h2>{data.title}</h2>
                <p>{text}</p>
            </div>
            <div className='photo'><img src={data.source_info.img} alt={data.source_info.img} /></div>
            <div className="see-more"><a href={data.url} rel='noopener noreferrer' target='_blank'>see more</a></div>
        </article>
    );
}

export default Article;