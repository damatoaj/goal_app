import axios from 'axios';
import React, {FormEvent, useRef} from 'react'
import {Outcome} from '../../interfaces/outcomeGoals.model';

type formProps = {
    id: string;
    setOc:(arg: Outcome)=> void;
}

const PerformanceForm: React.FC <formProps> = (props) => {
    const descInputRef = useRef<HTMLInputElement>(null);
    const dateDueInputRef = useRef<HTMLInputElement>(null);
    const rewardInputRef = useRef<HTMLInputElement>(null);
    const punishmentInputRef = useRef<HTMLInputElement>(null);
    const percentInputRef = useRef<HTMLInputElement>(null);
    
    const addPerf = async (e:FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/outcomes/${props.id}/performances`, {
                description: descInputRef.current!.value.trim(),
                dueDate: dateDueInputRef.current!.value,
                reward: rewardInputRef.current!.value.trim(),
                punishment: punishmentInputRef.current!.value.trim(),
                percentImproved: percentInputRef.current!.value,
                complete: false,
                processGoals: []
            });
            const oc : any = await axios.get(`http://localhost:3000/outcomes/${props.id}`);
            const data : Outcome = oc.data;
            props.setOc(data);

            descInputRef.current!.value = '';
            dateDueInputRef.current!.value = '';
            rewardInputRef.current!.value = '';
            punishmentInputRef.current!.value = '';
            percentInputRef.current!.value = '';
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={addPerf}>
            <fieldset>
                <label htmlFor="description">What's the goal?</label>
                <input type="text" name="description" ref={descInputRef}/>
                <br></br>
                <label htmlFor="dueDate">When's it due?</label>
                <input type="date" name="dueDate" ref={dateDueInputRef}/>
                <br></br>
                <label htmlFor="percentImproved">How much will you improve by?</label>
                <input type="number" name="percentImproved" ref={percentInputRef} />
                <br></br>
                <label htmlFor="reward">How will you reward yourself?</label>
                <input type="text" name="reward" ref={rewardInputRef} />
                <br></br>
                <label htmlFor="punishment">How will you hold yourself accountable?</label>
                <input type="text" name="punishment" ref={punishmentInputRef} />
                <br></br>
                <button type="submit">Add</button>
            </fieldset>
        </form>
    )
};

export default PerformanceForm;