import React from 'react';

interface DataTimerProps {
    doReset: number,
    doAction: Function
}

const DataTimer = (props: DataTimerProps)=>{
    const {doReset, doAction} = props;
    const [resetTrigger, setResetTrigger] = React.useState(doReset);
    const [seconds, setSeconds] =  React.useState(0);
    const [isActive, setIsActive] =  React.useState(false);
  
 
    const reset = () => {
      setSeconds(0);
      setIsActive(true);
    }
  
    React.useEffect(()=>{
        if(doReset != resetTrigger){
            reset();
        }
    },[doReset]);

    React.useEffect(() => {
      let interval: any = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div  className="flex flex-col items-center  mr-10">
            <button
                onClick={()=>{doAction(); reset();}} 
                className="bg-clifford hover:bg-red-500 text-white py-1 px-3 rounded-full">
                Load Data 
            </button>
            <div className="text-xs">{seconds} sec old data</div>
        </div> 
    )
    
};

export default DataTimer;