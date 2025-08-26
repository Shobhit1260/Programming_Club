import React from 'react'
import { useState, useEffect } from 'react';
function CountDown({years="2025", month="09", date="29"}) {
    const [TimeLeft,SetTimeLeft]=useState({
        days:0,
        hours:0,
        minutes:0,
        seconds:0
    });
    
    useEffect(()=>{
        const nextEventDate=new Date(`${years}-${month}-${date}T00:00:00`);
        const CalculateTimeLeft=()=>{
        const diff= +nextEventDate - +new Date();     
        if(diff>0){
            SetTimeLeft({
            days:Math.floor(diff/(1000*24*60*60)),
            hours:Math.floor(diff/(1000*60*60)%24),
            minutes:Math.floor(diff/(1000*60)%60),
            seconds:Math.floor(diff/(1000)%60),
        })
        }
        else{
           SetTimeLeft({
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
        })
        }}
        const timer=setInterval(CalculateTimeLeft, 1000); 
        CalculateTimeLeft();
        return () => clearInterval(timer);
    },[])
    //    console.log(TimeLeft);   

  return (
    <div className='flex justify-between items-center '>
       <div >
             <div>{TimeLeft.days}</div>
              <span>Days</span>
       </div>
       <div>
             <div>{TimeLeft.hours}</div>
              <span>Hours</span>
       </div>
       <div>
             <div>{TimeLeft.minutes}</div>
              <span>Minutes</span>
       </div>
       <div>
             <div>{TimeLeft.seconds}</div>
             <span>Seconds</span>
       </div>
    </div>
  )
}

export default CountDown
