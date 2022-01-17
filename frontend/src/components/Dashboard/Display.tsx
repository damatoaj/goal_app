import React from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type displayProps = {
    active: Outcome;
}

const Display: React.FC <displayProps> = (props) => {
    return (
        <article id="dash-header">
            <h1>{props.active.description}</h1>
            <p>{props.active.complete}</p>
            <p>Due on <time>{props.active.dateDue}</time></p>
            <p>{props.active.punishment}</p>
            <p>{props.active.reward}</p>
        </article>
    )
};

export default Display