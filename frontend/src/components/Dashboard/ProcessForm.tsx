import axios from 'axios';
import React, {FormEvent, useState} from 'react'
import { Outcome } from '../../interfaces/outcomeGoals.model';
import {Performance} from '../../interfaces/performanceGoals.model';

type pfProps = {
    performance: Performance;
    setToggle: (arg:Boolean) => void;
    toggle: Boolean;
    ogID:String;
    setOutcomes:(arg:Outcome[]) => void;
    setActive: (arg:Outcome)=> void;
    active: Outcome;
}

const ProcessForm: React.FC <pfProps> = (props) => {
    const [action, setAction] = useState <string>('');
    const [duration, setDuration] = useState<number>(0);
    const [frequency, setFrequency] = useState<number>(0);
    const [repeats, setRepeats] = useState<Boolean>(false);

    const handleSubmit= async(e:FormEvent, oid:String, pid:string, aid:string, setO:Function, setA:Function, setT:Function) => {
        e.preventDefault();
        try{
            const req : any = await axios.post(`http://localhost:3000/outcomes/${oid}/performances/${pid}/processes`, {
                action:action,
                duration:duration,
                frequency:frequency,
                repeats:repeats,
            });
            const res : any = await axios.get(`http://localhost:3000/outcomes/`)
            const data : Outcome [] = res.data;
            if (data) {
                let a = data.find(d => d._id === aid);
                setO(data);
                if(a) setA(a);
                console.log(props.active, a, '<----check a and active')
                setT(false);
            }
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <fieldset id="pgForm">
            <legend>New Process Goal</legend>
            <form>
                <label htmlFor="action">
                    Action
                </label>
                <input 
                    type="string" 
                    name="action" 
                    onChange={(e)=>setAction(e.target.value)}
                />
                <br></br>
                <label htmlFor="duration">
                    Duration
                </label>
                <input 
                    type="number" 
                    name="duration" 
                    onChange={(e)=>setDuration(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="frequency">
                    Frequency
                </label>
                <input 
                    type="number" 
                    name="frequency" 
                    onChange={(e)=>setFrequency(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="repeats">
                    Repeats
                </label>
                <input 
                    type="checkbox" 
                    name="repeats" 
                    onChange={(e)=>setRepeats(e.target.checked)}
                />
                <br></br>
                <button 
                    onClick={(e)=> handleSubmit(
                            e, 
                            props.ogID, 
                            props.performance._id, 
                            props.active._id,
                            props.setOutcomes, 
                            props.setActive,
                            props.setToggle
                        )}
                >
                    Submit
                </button>
                <button onClick={()=> props.setToggle(false)}>
                    X
                </button>
            </form>
        </fieldset>
    )
};

export default ProcessForm;