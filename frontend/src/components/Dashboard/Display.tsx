import React, { MouseEvent } from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type displayProps = {
    active: Outcome;
    delete: (e: MouseEvent)=> void;
}

const Display: React.FC <displayProps> = (props) => {
    console.log(props.active)
    return (
        <header>
            <h1>{props.active.description}</h1>
            <button onClick={props.delete} name={props.active._id}>Delete</button>
        </header>
    )
};

export default Display