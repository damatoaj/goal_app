import React from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type outcomesProps = {
    outcomes: Outcome [];
    setOc: (arg:Outcome) => void;
}
const SelectOutcome: React.FC <outcomesProps> = (props) => {
    let options = props.outcomes.map((outcome: Outcome, id:number)=> {
        return (
            <option key={id} value={outcome.description}>{outcome.description}</option>
        )
    });

    const handleSelect = (idx:number, outcomes:Outcome[], setO:Function) => {
        let arr = outcomes.filter(outcome => outcomes.indexOf(outcome) === idx);
        setO(arr[0]);
    };

    return (
        <>
        <h2>Or edit a goal you already have</h2>
        <select onChange={(e)=> handleSelect(e.target.options.selectedIndex, props.outcomes, props.setOc)} name='oc'>
            {options}
        </select>
        </>
    )
};

export default SelectOutcome;