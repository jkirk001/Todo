import React, { useEffect, useState } from "react";

const Timer = (props) => {
  //! initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(props.timeLeft);

  //! spreads classHandler from props -- keeps timer in state, so li can change classes appropriately, keeps state here so it nows when to stop Timers
  const { classHandler } = props;
  useEffect(() => {
    //!Stops timers
    if (!timeLeft || timeLeft <= 0) {
      classHandler(timeLeft);
      return;
    }
    //!async function that is the timer
    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      classHandler(timeLeft - 1);
    }, 1000);
    //! Garbage collection
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, classHandler]);

  let hours = Math.floor(timeLeft / (60 * 60));
  let min = Math.floor((timeLeft % (60 * 60)) / 60);
  let sec = Math.floor((timeLeft % (60 * 60)) % 60);

  let finalTime = `${hours > 9 ? hours : "0" + hours}h, ${
    min > 9 ? min : "0" + min
  }m`;
  if (hours === 0 && min < 10) {
    finalTime = `${hours > 9 ? hours : "0" + hours}h, ${
      min > 9 ? min : "0" + min
    }m, ${sec > 9 ? sec : "0" + sec}s`;
  }

  return (
    <React.Fragment>
      <p>{timeLeft > 0 ? finalTime : "Out of Time!"}</p>
    </React.Fragment>
  );
};

export default Timer;

//!Thanks stackOverflow for the idea
