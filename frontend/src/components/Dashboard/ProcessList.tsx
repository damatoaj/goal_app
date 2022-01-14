import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Process} from '../../interfaces/processGoals.models';
import ProcessGoal from './ProcessGoal';

type proProps = {
    performance: Performance;
}

const ProcessList:React.FC <proProps> = (props) => {
    let list = props.performance.processGoals.map((process: Process, i: number) => {
        return <li key={i}><ProcessGoal process={process}/></li>
    })

    return(
        <>
            <h3>{props.performance.description}</h3>
            {list}
        </>
    )
};

export default ProcessList;