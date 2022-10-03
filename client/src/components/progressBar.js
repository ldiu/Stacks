import React from 'react'

const ProgressBar = (props) => {
    const { bgcolor, total, max } = props;

    var widthFill = total / max * 100;
if (widthFill >= 100){
    widthFill = "100%"
} else {
    widthFill = widthFill.toFixed(2) + "%";
}

    return (
        <div className='barOutline'>
            <div className='barFill' style={{ backgroundColor: bgcolor, width: widthFill}}>
                <div id='blankProgressDiv'></div>
                <div id="progressRatio">{widthFill}</div>
            </div>
        </div>
    );
};

export default ProgressBar


