import React, { MouseEvent } from 'react';
import { Article } from '../../interfaces/article.model';

type infoProp = {
    content: Article;
    handlePrev: (e:MouseEvent)=> void;
    handleNext: (e:MouseEvent)=> void;
}

const Info:React.FC <infoProp> = (props) => {
    return (
        <section>
            
            <article key={props.content.id}>
                <h2>{props.content.title}</h2>
                <p>{props.content.p1}</p>
                <p>{props.content.p2}</p>
                <p>{props.content.p3}</p>
            </article>
            <button onClick={props.handlePrev}>Previous</button>
            <button onClick={props.handleNext}>Next</button>
        </section>
    )
}

export default Info;