import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const FiveStarRating = (count) =>{
    const stars =[]

    for(let i=0 ; i<5 ;i++){
        if(i<count.count){
            stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{color:'yellow'}}/>)
        }else{
            stars.push(<FontAwesomeIcon icon={faStar} key={i}/>)
        }
    }
    return (
        <div>
            {stars}
        </div>
    )
}

export default FiveStarRating;