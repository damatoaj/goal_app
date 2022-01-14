import axios from 'axios';
import React, {FormEvent, useState} from 'react'
import {Performance} from '../../interfaces/performanceGoals.model';

type pfProps = {
    performance: Performance;
    setToggle: (arg:Boolean) => void;
    toggle: Boolean;
    ogID:String;
}

const ProcessForm: React.FC <pfProps> = (props) => {
    const [action, setAction] = useState <string>('');
    const [duration, setDuration] = useState<number>(0);
    const [frequency, setFrequency] = useState<number>(0);
    const [repeats, setRepeats] = useState<Boolean>(false);

    const handleSubmit= async(e:FormEvent) => {
        e.preventDefault();
        try{
            const req = await axios.post(`http://localhost:3000/outcomes/${props.ogID}/performances/${props.performance._id}/processes`, {
                action:action,
                duration:duration,
                frequency:frequency,
                repeats:repeats,
            });
            props.setToggle(false);
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <fieldset id="pgForm">
            <legend>New Process Goal</legend>
            <form>
                <label htmlFor="action">Action</label>
                <input type="string" name="action" onChange={(e)=>setAction(e.target.value)}/>
                <br></br>
                <label htmlFor="duration">Duration</label>
                <input type="number" name="duration" onChange={(e)=>setDuration(e.target.valueAsNumber)}/>
                <br></br>
                <label htmlFor="frequency">Frequency</label>
                <input type="number" name="frequency" onChange={(e)=>setFrequency(e.target.valueAsNumber)}/>
                <br></br>
                <label htmlFor="repeats">Repeats</label>
                <input type="checkbox" name="repeats" onChange={(e)=>setRepeats(e.target.checked)}/>
                <br></br>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={()=> props.setToggle(false)}>X</button>
            </form>
        </fieldset>
    )
};

export default ProcessForm;