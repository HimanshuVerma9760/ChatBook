import { useState, useRef } from "react";

export default function Timer() {
  const [timer, setTimer] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  function updateTimer() {
    const now = Date.now();
    if (startTimeRef.current !== null) {
      const elapsed = (now - startTimeRef.current) / 1000; // Calculate elapsed time in seconds
      setTimer(elapsed);
    }
    animationFrameRef.current = requestAnimationFrame(updateTimer); // Loop to keep updating
  }

  function startTimer() {
    if (!isTimerStart) {
      setIsTimerStart(true);
      startTimeRef.current = Date.now() - timer * 1000; // Resume from the current timer value
      updateTimer();
    }
  }

  function pauseTimer() {
    setIsTimerStart(false);
    cancelAnimationFrame(animationFrameRef.current);
  }

  function resetTimer() {
    setIsTimerStart(false);
    cancelAnimationFrame(animationFrameRef.current);
    setTimer(0);
    startTimeRef.current = null;
  }

  return (
    <>
      <p>Timer: {timer.toFixed(2)} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  );
}
