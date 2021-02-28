import React, { useEffect, useState } from "react";

const Timer = (props) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(props.timeLeft);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft || timeLeft <= 0) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

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
