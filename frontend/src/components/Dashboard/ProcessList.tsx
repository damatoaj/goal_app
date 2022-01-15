import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessGoal from './ProcessGoal';

type proProps = {
    performance: Performance;
    setOutcomes: (arg:Outcome[])=>void;
}

const ProcessList:React.FC <proProps> = (props) => {
    console.log(props.performance.processGoals, '<---line 13 processlist')
    let list = props.performance.processGoals.map((process: Process, i: number) => {
        return <li key={i}><ProcessGoal process={process} setOutcomes={props.setOutcomes}/></li>
    })

    return(
        <>
            <h3>{props.performance.description}</h3>
            {list}
        </>
    )
};

export default ProcessList;