import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIDRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
            return () => clearInterval(intervalIDRef.current);
        }
    }, [isRunning]);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatTime = () => {
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className='img px-4 flex justify-center items-center w-full h-screen'>
            <div className='px-6 rounded-xl pb-4 bg-transparent backdrop-blur-md flex flex-col justify-center items-center'>
                <div className="display font-bold font-mono text-[12vw] md:text-[4vw] lg:text-[4vw]">{formatTime()}</div>
                <div className='controls flex justify-center items-center gap-6'>
                    <button className='bg-orange-700 rounded-lg p-2 font-bold' onClick={reset}>Reset</button>
                    <button className='bg-green-700 rounded-lg p-2 font-bold' onClick={start}>Start</button>
                    <button className='bg-red-700 rounded-lg p-2 font-bold' onClick={stop}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
