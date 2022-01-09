import React from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';


type perfProps = {
    performances: Performance [];
}

const Perf: React.FC <perfProps> = (props) => {
    let list = props.performances.map((performance:Performance,key:number) => {
        let date : Date = new Date(performance.dueDate);
            return (
                <form key={key}>
                    <fieldset>
                        <legend>{performance.description}</legend>
                        {performance.completed === true ?
                            <>
                            <label htmlFor="completed" >You finished it, way to go</label>
                            <input type="checkbox" name="completed" checked/>
                            </>
                            :
                            <>
                            <label htmlFor="completed">Not done yet</label>
                            <input type="checkbox" name="completed" />
                            </>
                        }
                        <br></br>
                        <label htmlFor="dueDate">Currently due on <time>{date.toLocaleDateString()}</time></label>
                        <input type="date" name="dueDate" />
                        <br></br>
                        <label htmlFor="reward">How will you reward yourself?</label>
                        <input type="text" name="reward" placeholder={performance.reward}/>
                        <br></br>
                        <label htmlFor="punishment">How will you hold yourself accountable?</label>
                        <input type="text" name="punishment" placeholder={performance.punishment} />
                        <br></br>
                        <label htmlFor="percentImproved">What percentage will you improve by?</label>
                        <input type="number" name="percentImproved" placeholder={performance.percentImproved.toString()} />
                        <br></br>
                        <button>Update</button>
                        <button>Delete</button>
                    </fieldset>
                </form>
            )
        });

        return (
            <>
               {list}
            </>
        )


};

export default Perf;