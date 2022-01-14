import React, { FormEvent} from 'react';
import PerfList from './PerfList';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import "react-datepicker/dist/react-datepicker.css";

type perfProps = {
    performances: Performance [];
    setOutcomes: (arg: Outcome[]) => void;
    delete: (arg: FormEvent, id:string) => void;
    ogID : String;
}

const Perf: React.FC <perfProps> = (props) => {

    let list = props.performances.map((performance:Performance,key:number) => {
        return (
            <li key={key}>
                <PerfList performance={performance} delete={props.delete} setOutcomes={props.setOutcomes} ogID={props.ogID} />
            </li>
        )
    })
    return (
        <ul>
            {list}
        </ul>
    )
};

export default Perf;