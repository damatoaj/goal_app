import axios from 'axios';
import React, { useEffect, useState, FormEvent} from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';
import {Link} from 'react-router-dom';


import OutcomeLi from './OutcomeLi';
import Perf from './Performance';
import Display from './Display';
import Process from './Process';

const Dashboard: React.FC = () => {
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    const [active, setActive] = useState<Outcome>(outcomes[0]);

    useEffect(()=> {
        (async ()=> {
           const res : any =  await axios.get('http://localhost:3000/outcomes');
           const data : Outcome [] = await res.data;
           if (data) {
                setOutcomes(data);
                setActive(data[0]);
           };
        })()
    }, []);

    const handleActive = (e: any) => {
        setActive(outcomes[e.target.name])
    };

    const deleteOutcome = async (e:any) => {
        try {
            const req : any = await axios.delete(`http://localhost:3000/outcomes/${e.target.name}`);
            const res : any = await axios.get('http://localhost:3000/outcomes');
            const data : Outcome [] = res.data;
            if(data) {
                setOutcomes(data)
                setActive(data[0])
            };
        } catch(err) {
            console.log(err)
        }
    };

    const deletePerformance = async (e:FormEvent, id:string, setO:Function, setA:Function, aid:string) => {
        e.preventDefault();
        try {
            const req = await axios.delete(`http://localhost:3000/performances/${id}`);
            const res = await axios.get(`http://localhost:3000/outcomes`);
            const data : Outcome[] = await res.data;
            if(data) {
                let a : Outcome | undefined= data.find(d => d._id === aid)
                setO(data);
                if (a) setA(a)
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <section id="dashboard">
            <div id="dash-col-1">
            <h1>Outcome Goals</h1>
            <ul>
                {outcomes.map((outcome: Outcome, id:number) => {
                    return (
                        <OutcomeLi 
                            key={id} 
                            id={id}
                            description={outcome.description} 
                            handleActive={handleActive} 
                            delete={deleteOutcome} 
                            active={active}
                        />
                    )
                })}
            </ul>
            </div>
            <div id="dash-col-2">
                
                {active ? <Display active={active}/> : <></> }
                {active ?
                    <ul> 
                        <Perf 
                            performances={active.performanceGoals} 
                            setOutcomes={setOutcomes} 
                            delete={deletePerformance} 
                            ogID={active._id}
                            setActive={setActive}
                            active={active}
                        /> 
                        <Process 
                            performances={active.performanceGoals} 
                            setOutcomes={setOutcomes}
                            setActive={setActive}
                            active={active}
                        />
                    </ul>
                    :
                    <Link to='/newOutcome'>Make some goals</Link>
                }
            </div>
        </section>
    )
};

export default Dashboard;