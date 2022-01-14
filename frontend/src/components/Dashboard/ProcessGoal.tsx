import React, {FormEvent, useState} from 'react';
import {Process} from '../../interfaces/processGoals.models';

type pgProps = {
    process: Process;
}

const ProcessGoal: React.FC <pgProps> = (props) => {
    const [duration, setDuration] = useState<number>(props.process.duration);
    const [frequency, setFrequency] = useState<number>(props.process.frequency);
    const [repeats, setRepeats] = useState<boolean>(props.process.repeats);

    const handleUpdate = (e:FormEvent) => {
        e.preventDefault();
        console.log('update click')
    };

    const handleDelete = (e:FormEvent) => {
        e.preventDefault();
        console.log('click delete')
    };

    return( 
        <fieldset>
            <legend>{props.process.action}</legend>
            <form>
                <label htmlFor="duration">Duration</label>
                <input type="number" name="duration" value={duration} onChange={(e)=>setDuration(e.target.valueAsNumber)}/>
                <br></br>
                <label htmlFor="frequency">Frequency</label>
                <input type="number" name="frequency" value={frequency} onChange={(e)=>setFrequency(e.target.valueAsNumber)}/>
                <br></br>
                <label htmlFor="repeats">Repeats</label>
                <input type="checkbox" name="repeats" checked={repeats} onChange={(e)=>setRepeats(e.target.checked)}/>
                <br></br>
                <button onClick={(e:FormEvent)=> handleUpdate(e)}>Update</button>
                <button onClick={(e:FormEvent)=> handleDelete(e)}>X</button>
            </form>
        </fieldset>
        )
};

export default ProcessGoal;