import React, { MouseEvent } from 'react';

type liProps = {
    id : number;
    description: string;
    handleActive: (e:MouseEvent)=> void;
    delete: (e:MouseEvent)=> void;
}

const OutcomeLi: React.FC <liProps> = (props) => {
    return(
        <li>
            <button onClick={props.handleActive} name={props.id.toString()}>{props.description}</button>
        </li>
    )
};

export default OutcomeLi;