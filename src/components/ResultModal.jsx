import { forwardRef,useImperativeHandle,useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({targetTime,onReset,timeRemaining},ref) {
    const dialog = useRef();

    const userLost = timeRemaining<=0;
    const formattedRemainingTime = (timeRemaining/1000).toFixed(2);
    const score = Math.round((1-(timeRemaining/(targetTime*1000)))*100);

    useImperativeHandle(ref,()=>{
        return {
            myOpenFun() {
                dialog.current.showModal();
            }
        }
    });


    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <h2>You {userLost==true?'Lost':'Won'}!</h2>
            {!userLost && <h3>Score : {score}</h3>}
            <p>Your target time was <stong>{targetTime}</stong>.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong>.</p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal;