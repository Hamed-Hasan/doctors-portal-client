import React from 'react';
function iframe() {
    return {
        __html: '<iframe src="doctor-slider/slider.html" width="100%" height="800" frameborder="0" scrolling="no"></iframe>'
    }
}


export default function Exercises() {
    return (
        <div>
            <div dangerouslySetInnerHTML={iframe()} />
        </div>)
}