import React, {useState} from 'react';
import OutcomeForm from './OutcomeForm';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import PerformanceForm from './PerformanceForm';

const NewOutcome: React.FC = () => {
    const [oc, setOc] = useState<Outcome | null>(null);
    console.log(oc, 'in the new outcome')


    if (!oc) {
        return (
            <main>
                <h1>Make A New Outcome Goal </h1>
                <OutcomeForm setOc={setOc} />
            </main>
        )
    } else{
        return(
            <main>
                {oc.performanceGoals?.length > 0 ? <h1>Add more...</h1> : <h1>Add a Performance Goal</h1>}
                <PerformanceForm id={oc._id} setOc={setOc}/>
            </main>
        )
    }
};

export default NewOutcome;