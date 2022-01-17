import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessGoal from './ProcessGoal';

type proProps = {
    performance: Performance;
    setOutcomes: (arg:Outcome[])=>void;
    setActive: (arg:Outcome) => void;
    active: Outcome;
}

const ProcessList:React.FC <proProps> = (props) => {
    let list = props.performance.processGoals.map((process: Process, i: number) => {
        return (
            <li key={i}>
                <ProcessGoal 
                    process={process} 
                    setOutcomes={props.setOutcomes}
                    setActive={props.setActive}
                    active={props.active}
                />
            </li>
        )
    });

    return(
        <>
            {list}
        </>
    )
};

export default ProcessList;