import axios from 'axios';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type pgProps = {
    process: Process;
    setOutcomes:(arg:Outcome[]) => void;
    setActive:(arg:Outcome) => void;
    active: Outcome;
}

const ProcessGoal: React.FC <pgProps> = (props) => {
    const [duration, setDuration] = useState<number>(props.process.duration);
    const [frequency, setFrequency] = useState<number>(props.process.frequency);
    const [repeats, setRepeats] = useState<boolean>(props.process.repeats);

    const handleUpdate = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
        try {
            const req :any = await axios.put(`http://localhost:3000/processes/${id}`, {
                duration: duration,
                frequency: frequency,
                repeats:repeats
            })
            const res :any = await axios.get(`http://localhost:3000/outcomes`);
            const data : Outcome [] = await res.data;
            if(data) {
                let a : Outcome | undefined = data.find(d => d._id === act);
                setO(data);
                if(a) setA(a);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
        try {
            const req : any = await axios.delete(`http://localhost:3000/processes/${id}`);
            const res : any = await axios.get(`http://localhost:3000/outcomes`);
            const data : Outcome[]=  res.data;
            console.log(req, res, data, 'please work')
            let a : Outcome | undefined = data.find(d => d._id === act);
            setO(data);
            if(a) setA(a);
        } catch (err) {
            console.log(err);
        }
    };

    return( 
        <fieldset>
            <legend>{props.process.action}</legend>
            <form>
                <label htmlFor="duration">
                    Duration
                </label>
                <input 
                    type="number" 
                    name="duration" 
                    value={duration} 
                    onChange={(e)=>setDuration(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="frequency">
                    Frequency
                </label>
                <input 
                    type="number" 
                    name="frequency"
                    value={frequency} 
                    onChange={(e)=>setFrequency(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="repeats">
                    Repeats
                </label>
                <input 
                    type="checkbox" 
                    name="repeats" 
                    checked={repeats} 
                    onChange={(e)=>setRepeats(e.target.checked)}
                />
                <br></br>
                <button 
                    onClick={(e:FormEvent)=> handleUpdate(
                        e,
                        props.process._id, 
                        props.active._id, 
                        props.setActive, 
                        props.setOutcomes
                    )}
                >
                    Update
                </button>
                <button 
                    onClick={(e:FormEvent)=> handleDelete(
                        e, 
                        props.process._id, 
                        props.active._id, 
                        props.setActive, 
                        props.setOutcomes
                        )}
                >
                    X
                </button>
            </form>
        </fieldset>
        )
};

export default ProcessGoal;