import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const isTimeActive = timeRemaining>0 && timeRemaining<targetTime*1000;

    if(timeRemaining<=0) {
        clearInterval(timer.current);
        dialog.current.myOpenFun();
    }
    
    function handleReset() {
        setTimeRemaining(targetTime*1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(timeRemaining => timeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.myOpenFun();
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} onReset={handleReset} timeRemaining={timeRemaining}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime !== 1 && 's'} target time.
                </p>
                <p>
                    <button onClick={isTimeActive ? handleStop : handleStart}>
                        {isTimeActive ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={isTimeActive?'active': undefined}>
                    {isTimeActive ? 'Time is running out...' : 'Not running'}
                </p>
            </section>
        </>
    )
}