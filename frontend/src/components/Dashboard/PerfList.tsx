import React, {useState, FormEvent, MouseEvent} from 'react';
import axios from 'axios';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import ProcessForm from './ProcessForm';

type listProp = {
    performance: Performance;
    setOutcomes: (arg: Outcome[]) => void;
    delete: (arg: FormEvent, id:string) => void;
    ogID: String;
}

const PerfList: React.FC <listProp> = (props) => {
    const [toggle, setToggle] = useState<Boolean>(false);
    const [dateDue, setDateDue] = useState<Date>(new Date());
    const [completed, setCompleted] = useState<Boolean>(false);
    const [reward, setReward] = useState<String>('');
    const [punishment, setPunishment] = useState<String>('');
    const [percentImproved, setPercentImproved] = useState<Number>(0);

    let date : Date = new Date(props.performance.dueDate);

    const updatePerformance = async (e:FormEvent, id:string) => {
        e.preventDefault();
        try {
            const req : any = await axios.put(`http://localhost:3000/performances/${id}`, {
                dateDue: new Date(dateDue),
                completed: completed,
                reward: reward,
                punishment: punishment,
                percentImproved: percentImproved
            });
            console.log(req)
            const res : any = await axios.get(`http://localhost:3000/outcomes`);
            console.log(res, '<==== update form')
            const data : Outcome[] = res.data;
            props.setOutcomes(data);
        } catch(err) {
            console.log(err)
        }
    };

    const showForm = (e:MouseEvent) => {
        e.preventDefault();
        console.log('click')
        setToggle(true);
        console.log(toggle)
    }

    return (
        <>
            {!toggle? 
            <form>
                <fieldset>
                    <legend>{props.performance.description}</legend>
                    {props.performance.completed === true ?
                        <>
                        <label htmlFor="completed" >You finished it, way to go</label>
                        <input type="checkbox" name="completed" checked onChange={(e)=>setCompleted(e.target.checked)}/>
                        </>
                        :
                        <>
                        <label htmlFor="completed">Not done yet</label>
                        <input type="checkbox" name="completed" onChange={(e)=>setCompleted(e.target.checked)} />
                        </>
                    }
                    <br></br>
                    <label htmlFor="dueDate">Currently due on <time>{date.toLocaleDateString()}</time></label>
                    <DatePicker selected={dateDue} name="dateDue" onChange={(date: Date)=> setDateDue(date)} />
                    <br></br>
                    <label htmlFor="reward">How will you reward yourself?</label>
                    <input type="text" name="reward"  placeholder={props.performance.reward} onChange={(e)=> setReward(e.target.value)}/>
                    <br></br>
                    <label htmlFor="punishment">How will you hold yourself accountable?</label>
                    <input type="text" name="punishment" placeholder={props.performance.punishment} onChange={(e)=>setPunishment(e.target.value)}/>
                    <br></br>
                    <label htmlFor="percentImproved">What percentage will you improve by?</label>
                    <input type="number" name="percentImproved"  placeholder={props.performance.percentImproved.toString()} onChange={(e)=>setPercentImproved(e.target.valueAsNumber)}/>
                    <br></br>
                    <button onClick={(e)=> showForm(e)}>Add Process Goal</button>
                    <button onClick={(e)=> updatePerformance(e, props.performance._id)} type="submit">Update</button>
                    <button onClick={(e)=> props.delete(e, props.performance._id)}>Delete</button>
                </fieldset>
            </form> :
            <ProcessForm performance={props.performance} setToggle={setToggle} toggle={toggle} ogID={props.ogID} setOutcomes={props.setOutcomes}/>
        }
        </>
    )
};

export default PerfList