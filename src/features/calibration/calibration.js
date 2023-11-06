import { useState, useEffect } from 'react';
import style from './calibration.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTrial, resetTrialCount, incrementTrialCount } from './calibrationReducer';
import useMouseTracker from '../../hooks/useMouseTracker';
import useDeadlines from '../../hooks/useDeadlines';  // Import the new hook
import Dialog from '../../components/dialog.styled';
import { Button, MTbutton } from '../../components/button.styled';
import { Typography } from '../../components/styles/typography.styled';
import TrajectoryCanvas from './TrajectoryCanvas';

function Calibration() {

    const trialCount = useSelector(state => state.calibration.trialCount);
 
    const [side, setSide] = useState('left');
    const [startTime, setStartTime] = useState(null);  // Re-introduce startTime
    const [clearCanvas, setClearCanvas] = useState(false);
    const [starting, setStarting] = useState();
    const [mousePos, setMousePos] = useState({});
    const [disabled, setDisabled] = useState({ square: false, option: true });
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mouseData, startTracking, stopTracking, lastTimestamp } = useMouseTracker();
    const { message, deadline, endTime, meetMovementDeadline, resetDeadlines } = useDeadlines(startTime); 

    const handleMouseMove = (event) => {
        setMousePos({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (disabled.option) {  // Ensure this effect only runs when the trial has started
            if (mousePos.y <= starting - 50) {
                meetMovementDeadline();
                setDisabled({ ...disabled, option: false });
            }
        }
    }, [mousePos, starting, meetMovementDeadline]);

    const handleStartButtonClick = () => {
        setStartTime(Date.now());  // Set startTime
        setStarting(mousePos.y);
        startTracking();
        setClearCanvas(true);
        setDisabled({ ...disabled, square: true });
    };

    const handleResponseSelection = () => {
        stopTracking();
        const rt = lastTimestamp;
        dispatch(addTrial({ id: trialCount+1, side, rt, tracking: mouseData }));
        resetTrial();
        resetDeadlines();
        dispatch(incrementTrialCount());
    };

    const resetTrial = () => {
        if(deadline) {
            setClearCanvas(true);
        } else {
            setClearCanvas(false);
        }
        stopTracking(); // Stop tracking the mouse movement
        setStartTime(null); 
        setStarting(null);
        setMousePos({});
        setDisabled({ square: false, option: true });
        resetDeadlines();
    };

    useEffect(() => {
        if (trialCount === 20) {
            setSide(prevSide => (prevSide === 'left' ? 'right' : 'left'));
            dispatch(resetTrialCount());
            if (side === 'right') navigate('/training');
        }
    }, [trialCount, side, navigate]);

    // Close feedback
    useEffect(() => {
        if (deadline) {
            setOpen(true)
            const timeoutId = setTimeout(() => {
                setOpen(false);
                resetTrial();
            }, 1500);  // Wait for 2 seconds
            // Cleanup function to clear the timeout if the component is unmounted or if deadline changes
            return () => clearTimeout(timeoutId);
        }
    }, [deadline]);

    return (
        <div className={style.root}>
            <div className={style.canvas}>
                {trialCount > 0 && <TrajectoryCanvas mouseData={mouseData} clear={clearCanvas} />}
            </div>
            <div className={style.choice}>
                <MTbutton disabled={side === 'right' || disabled.option} style={{ opacity: side === 'right' ? 0 : 1 }} onClick={handleResponseSelection}></MTbutton>
                <MTbutton disabled={side === 'left' || disabled.option} style={{ opacity: side === 'left' ? 0 : 1 }} onClick={handleResponseSelection}></MTbutton>
            </div>
            <div className={style.start}>
                <Button className='outlined' onClick={handleStartButtonClick} disabled={disabled.square}>+</Button>
            </div>
            <Dialog open={open}> 
                <div className={style.containerDialog}>
                    <Typography variant='h2'>Attention!</Typography>
                    <Typography variant='h4'>{message}</Typography>
                    {/* <Button onClick={resetTrial}>Recommencer</Button> */}
                </div>
            </Dialog>
            <div className={style.count}>
                {trialCount}
            </div>
        </div>
    );
}

export default Calibration;
