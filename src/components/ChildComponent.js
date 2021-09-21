import React from 'react';

export const ChildComponent = React.memo(function ChildComponent(props) { 
    const {child, onCheckIn, onCheckOut} = props;
    const childItemClass = child.checkedIn ? 'child-item checked' : 'child-item';
    const btnClass = child.checkedIn ? 'btn btn-rounded checked' : 'btn btn-rounded';
 
    const convert = (str)=>{
        let newStringDate = null;
        if (str) {
            newStringDate = new Date(str).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        }
        return newStringDate;
    }

    return (
        <div className={childItemClass} style={{background: 'url(' + child.image.small + ') no-repeat', backgroundSize: '100%' }}>
            <div className="child-name-lbl">
                <strong>{child.name.fullName}</strong>{child.checkedIn && child.pickupTime && <div>Pickup time: {convert(child.pickupTime)}</div>}
            </div> 
            <button className={btnClass} onClick={child.checkedIn? () => onCheckOut(child) : ()=>onCheckIn(child)}>
                {child.checkedIn? "CHECK OUT": "CHECK IN"}
            </button>
        </div>
    );
}, ({ child: childOldData }, { child: childNewData }) => 
childOldData.childId === childNewData.childId &&
childOldData.checkedIn === childNewData.checkedIn &&
childOldData.pickupTime === childNewData.pickupTime);
