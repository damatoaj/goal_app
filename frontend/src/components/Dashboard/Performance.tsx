import React, { FormEvent} from 'react';
import PerfList from './PerfList';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import {Link} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

type perfProps = {
    performances: Performance [];
    setOutcomes: (arg: Outcome[]) => void;
    delete: (e: FormEvent, id:string, setO:Function, setA:Function, aid:string) => void;
    ogID : String;
    setActive: (arg:Outcome)=> void;
    active: Outcome;
}

const Perf: React.FC <perfProps> = (props) => {

    let list = props.performances.map((performance:Performance,key:number) => {
        return (
            <li key={key}>
                <PerfList 
                    performance={performance} 
                    delete={props.delete} 
                    setOutcomes={props.setOutcomes} 
                    ogID={props.ogID}
                    setActive={props.setActive}
                    active={props.active}
                />
            </li>
        )
    })
    return (
        <ul>
            {list.length > 0 ? list : <Link to='/newOutcome'>Add some performance goals</Link>}
        </ul>
    )
};

export default Perf;