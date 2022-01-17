import React from 'react'

function SwipeButtons({id, handleSwipe}) {

    return (
        <div>
            <button 
                type="button" 
                id={id} 
                className="dislike-button" 
                onClick={handleSwipe}
            >
                No
            </button>
            <button 
                type="button" 
                id={id} 
                className="like-button" 
                onClick={handleSwipe}
            >
                Yes
            </button>
        </div>
    )
}

export default SwipeButtons
