import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';


import OutcomeLi from './OutcomeLi';
import Perf from './Performance';
import Display from './Display';
import Process from './Process';

const Dashboard: React.FC = () => {
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    const [active, setActive] = useState<Outcome>(outcomes[0]);
    console.log(outcomes)

    useEffect(()=> {
        (async ()=> {
           const resp : any =  await axios.get('http://localhost:3000/outcomes');
           const data : Outcome [] = await resp.data;
           setOutcomes(data);
           setActive(data[0]);
        })()
    }, []);

    const handleActive = (e: any) => {
        setActive(outcomes[e.target.name])
    }

    const deleteOutcome = async (e:any) => {
        try {
            const oc : any = await axios.delete(`http://localhost:3000/outcomes/${e.target.name}`);
            const resp : any = await axios.get('http://localhost:3000/outcomes');
            const data : Outcome [] = resp.data;
            setOutcomes(data)
            setActive(data[0])
        } catch(err) {
            console.log(err)
        }
    }

    const deletePerformance = async (e:any, id:string) => {
        e.preventDefault();
        try {
            const req = await axios.delete(`http://localhost:3000/performances/${id}`);
            const res = await axios.get(`http://localhost:3000/outcomes`);
            const data : Outcome[] = res.data;
            setOutcomes(data);
            setActive(req.data)
        } catch (err) {
            console.log(err)
        }
    };


    
    return (
        <section>
            <h1>Outcome Goals</h1>
            <ul>
                {outcomes.map((outcome, id) => {
                    return (
                        <OutcomeLi key={id} description={outcome.description} id={id} handleActive={handleActive} delete={deleteOutcome} />
                    )
                })}
            </ul>
            {active ? <Display active={active} delete={deleteOutcome}/> : <li>make some goals</li> }
                {active ?
                    <ul> 
                        <Perf performances={active.performanceGoals} setOutcomes={setOutcomes} delete={deletePerformance} ogID={active._id}/> 
                            <Process performances={active.performanceGoals} setOutcomes={setOutcomes}/>
                    </ul>: 
                    <li>Make some goals</li>
                }
        </section>
    )
};

export default Dashboard;