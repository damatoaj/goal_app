import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessList from './ProcessList';

type processProps = {
    performances: Performance [];
    setOutcomes :(arg: Outcome[])=> void;
    setActive: (arg:Outcome) => void;
    active:Outcome;
}
const Process:React.FC <processProps> = (props) => {
       let performances = props.performances.map((performance: Performance, id:number) => {
            return(
                <ul key={id}>
                    <ProcessList 
                        performance={performance} 
                        setOutcomes={props.setOutcomes}
                        setActive={props.setActive}
                        active={props.active}
                    />
                </ul>
            )
      })

      return (
          <>
              {performances}
          </>
      )
    
};

export default Process;