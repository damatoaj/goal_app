import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import ProcessList from './ProcessList';

type processProps = {
    performances: Performance [];
}
const Process:React.FC <processProps> = (props) => {
    console.log(props, '<---my props')
  
       let performances = props.performances.map((performance, i) => {
            return(<li key={i}><ProcessList performance={performance}/></li>)
      })

      return (
          <ul>
              {performances}
          </ul>
      )
    
};

export default Process;