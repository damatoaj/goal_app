import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessList from './ProcessList';

type processProps = {
    performances: Performance [];
    setOutcomes :(arg: Outcome[])=> void;
}
const Process:React.FC <processProps> = (props) => {
    console.log(props, '<---my props')
  
       let performances = props.performances.map((performance, i) => {
            return(<ul key={i}><ProcessList performance={performance} setOutcomes={props.setOutcomes}/></ul>)
      })

      return (
          <>
              {performances}
          </>
      )
    
};

export default Process;