import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';

type formProps = {
    setOc : (arg:Outcome)=> void;
};

const OutcomeForm : React.FC <formProps> = (props) => {
    const descInputRef = useRef<HTMLInputElement>(null);
    const dateDueInputRef = useRef<HTMLInputElement>(null);
    const rewardInputRef = useRef<HTMLInputElement>(null);
    const punishmentInputRef = useRef<HTMLInputElement>(null);

    const handleForm = async (e:FormEvent) => {
        e.preventDefault();
        try {
            const res: any = await axios.post(
                `http://localhost:3000/outcomes`,
                {
                description: descInputRef.current!.value.trim(),
                dateDue: dateDueInputRef.current!.value,
                reward: rewardInputRef.current!.value.trim(),
                punishment: punishmentInputRef.current!.value.trim(),
                complete: false,
                performanceGoals: []
            })
            const newOutcome: Outcome = res.data;
            props.setOc(newOutcome);
        } catch (err) {
            console.log(err)
        }
    };
    
    return (
        <form onSubmit={handleForm}>
            <fieldset>
            <label>What's the Goal?</label>
            <input type="text" name="description" ref={descInputRef}/>
            <br></br>
            <label>When's it Due?</label>
            <input type="date" name="dueDate" ref={dateDueInputRef}/>
            <br></br>
            <label>How will you reward yourself?</label>
            <input type="text" name="reward" ref={rewardInputRef} />
            <br></br>
            <label>How will you hold yourself accountable?</label>
            <input type="text" name="punishment" ref={punishmentInputRef} />
            <br></br>
            <button type="submit">Submit</button>
            </fieldset>
        </form>
    )
};

export default OutcomeForm;