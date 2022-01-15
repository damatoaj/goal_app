import React from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type outcomesProps = {
    outcomes: Outcome [];
    setOc: (arg:Outcome) => void;
}
const SelectOutcome: React.FC <outcomesProps> = (props) => {
    let options = props.outcomes.map((outcome, id)=> {
        return (
            <option key={id} value={outcome.description}>{outcome.description}</option>
        )
    });

    const handleSelect = (e:any) => {
        let arr = props.outcomes.filter(outcome => props.outcomes.indexOf(outcome) === e.target.options.selectedIndex);
        props.setOc(arr[0]);
    }
    return (
        <>
        <h2>Or edit a goal you already have</h2>
        <select onChange={(e)=> handleSelect(e)} name='oc'>
            {options}
        </select>
        </>
    )
};

export default SelectOutcome;