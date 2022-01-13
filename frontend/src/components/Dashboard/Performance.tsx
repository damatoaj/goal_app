import React, { FormEvent, useState } from 'react';
import PerfList from './PerfList';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

type perfProps = {
    performances: Performance [];
    setOutcomes: (arg: Outcome[]) => void;
    delete: (arg: FormEvent, id:string) => void;
}

const Perf: React.FC <perfProps> = (props) => {

    let list = props.performances.map((performance:Performance,key:number) => {
        return <PerfList key={key} id={key} performance={performance} delete={props.delete} setOutcomes={props.setOutcomes} />
    })
    return (
        <>{list}</>
    )
};

export default Perf;