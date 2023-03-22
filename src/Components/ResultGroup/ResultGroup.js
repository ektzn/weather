import React from 'react';
import Result from '../Result/Result';
import './ResultGroup.css';

const ResultGroup = (props) => {
    console.log(props.weatherCards);
    return(
        <div className="weatherCardGroup">
            {props.weatherCards.map((card)=>{
                return (
                    <div>
                        <Result weather={card} isRemoval={props.isRemoval} onRemove={props.onRemove} />
                     </div>
                );
            })
            }
        </div>
    );
}

export default ResultGroup;