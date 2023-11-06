import { useState, useEffect, useRef } from 'react';
import style from './trials.module.css';  // Consider renaming to 'trials.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMouseTracker from '../../hooks/useMouseTracker';
import useDeadlines from '../../hooks/useDeadlines';
import Dialog from '../../components/dialog.styled';
import { Button, MTbutton } from '../../components/button.styled';
import { Typography } from '../../components/styles/typography.styled';
import { ReactComponent as Fixed } from './fixed.svg'
import { addCompletedTrial, setTrialsSequence, incrementTrialIndex, resetTrialIndex, incrementSession } from './trialsReducer';

function generateTrials(nb_trials) {
    let trials = [];
    const directions = ['left', 'right']; // Directions possibles pour la décision

    // Générer toutes les combinaisons possibles pour direction et location
    let allCombinations = [];
    for (let directionN of directions) {
        for (let locationN of directions) {
            for (let directionN_1 of directions) {
                for (let locationN_1 of directions) {
                    const congruenceN = directionN === locationN ? 'congruent' : 'incongruent';
                    const congruenceN_1 = directionN_1 === locationN_1 ? 'congruent' : 'incongruent';
                    allCombinations.push({ directionN, locationN, directionN_1, locationN_1, congruenceN, congruenceN_1 });
                }
            }
        }
    }

    // Répéter les combinaisons pour atteindre 256 essais
    for (let i = 0; i < 16; i++) { // 16 répétitions pour chaque combinaison
        trials = trials.concat(allCombinations);
    }

    // Mélanger les essais pour la pseudo-randomisation
    for (let i = trials.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [trials[i], trials[j]] = [trials[j], trials[i]];
    }

    // Ajouter les numéros aux essais
    trials = trials.map(trial => ({
        ...trial,
        number: trial.directionN === 'left' ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 4) + 6,
    }));

    // S'assurer qu'il y a exactement 256 essais
    return trials.slice(0, nb_trials); // 256
}

function Trials() {
    // States
    const trials = useSelector(state => state.trials.trials);
    const trialIndex = useSelector(state => state.trials.trialIndex);
    const session = useSelector(state => state.trials.session);
    const nb_trials = useSelector(state => state.utils.nb_trials);
    const nb_session = useSelector(state => state.utils.session);

    const [disabled, setDisabled] = useState({ start: false, option: true, stimuli: true, mouveup: true });
    const [starting, setStarting] = useState();
    const [newSession, setNewSession] = useState(false);
    const [mousePos, setMousePos] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [initime, setInitime] = useState(null);
    const [open, setOpen] = useState(false);
    const [countDeadline, setCountDeadline] = useState(0);
    const { message, deadline, endTime, meetMovementDeadline, resetDeadlines } = useDeadlines(startTime);

    // initTime deadline
    const [openInitTime, setOpenInitTime] = useState(false);
    const startButtonDeadlineRef = useRef(null);

    // States Tracking
    const { mouseData, startTracking, stopTracking, lastTimestamp } = useMouseTracker();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Set Trials
    useEffect(() => {
        const newTrials = generateTrials(nb_trials);
        dispatch(setTrialsSequence(newTrials));
    }, [session, dispatch]);

    // Actions
    const handleStartButtonClick = () => {
        setInitime(prevInitime => Date.now() - prevInitime)
        setStartTime(Date.now());  // Set startTime
        startTracking();
        setStarting(mousePos.y);
        setDisabled({ ...disabled, option: false, start: true });

        if (startButtonDeadlineRef.current) {
            clearTimeout(startButtonDeadlineRef.current);
            setOpenInitTime(false);
        }
    }

    const handleResponseSelection = (response) => {
        // Process response, update state, store trial data, etc.
        const rt = lastTimestamp;
        const err = trials[trialIndex].directionN !== response.target.id;
        dispatch(addCompletedTrial({
            session: session,
            id: trialIndex,
            rt: rt,
            init_time: initime,
            tracking: mouseData,
            response: response.target.id,
            condition: trials[trialIndex].congruenceN,
            location: trials[trialIndex].locationN,
            direction: trials[trialIndex].directionN,
            stimuli: trials[trialIndex].number,
            error: err,
            deadline: countDeadline,
            // trial: trials[trialIndex],
        }));
        // reset
        resetTrial();
        // Move to the next trial
        dispatch(incrementTrialIndex());
        setCountDeadline(0);

        // Initiation Time Deadline (voir condition session)
        // startButtonDeadlineRef.current = setTimeout(() => {
        //     setOpenInitTime(true);
        // }, 1500);  // attendre 1,5s
    };

    const resetTrial = () => {
        setStartTime(null);
        setStarting(null);
        setMousePos({});
        setDisabled({ start: false, option: true, stimuli: true, mouveup: true });
        resetDeadlines();
        stopTracking();
        startButtonDeadlineRef.current = setTimeout(() => {
            setOpenInitTime(true);
        }, 1500);  // attendre 1,5s
    }

    // Mouse move up 
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
        if (disabled.mouveup) {  // Ensure this effect only runs when the trial has started
            if (mousePos.y <= starting - 50) {
                meetMovementDeadline();
                setDisabled({ ...disabled, mouveup: false, stimuli: false });
            }
        }
    }, [mousePos, starting, meetMovementDeadline]);

    // Init Time 
    useEffect(() => {
        setInitime(Date.now())
    }, [trialIndex, setInitime])

    // Trials and new session
    useEffect(() => {
        if (trialIndex === nb_trials) {
            if (session === nb_session) {
                // go to /end
                navigate('/end')
            } else {
                // Move to the next session
                // dispatch(incrementSession());
                // dispatch(resetTrialIndex());
                dispatch(incrementSession());
                dispatch(resetTrialIndex());
                setNewSession(true)
                // clear deadline init
                if (startButtonDeadlineRef.current) {
                    clearTimeout(startButtonDeadlineRef.current);
                    setOpenInitTime(false);
                }
            }
        }
    }, [trialIndex, session]);

    // Close feedback
    useEffect(() => {
        if (deadline) {
            setOpen(true)
            const timeoutId = setTimeout(() => {
                setOpen(false);
                resetTrial();
                // Si on recommence l'essai 
                // setCountDeadline(prevCountDeadline => prevCountDeadline + 1);

                // Si on passe à l'essai suivant en cas de non respect de la deadline
                dispatch(incrementTrialIndex()); 

                dispatch(addCompletedTrial({
                    session: session,
                    id: trialIndex,
                    rt: 0,
                    init_time: 0,
                    tracking: {},
                    response: 'none',
                    condition: trials[trialIndex].congruenceN,
                    location: trials[trialIndex].locationN,
                    direction: trials[trialIndex].directionN,
                    stimuli: trials[trialIndex].number,
                    error: true,
                    deadline: countDeadline,
                }));
            }, 1500);  // Wait for 2 seconds
            // Cleanup function to clear the timeout if the component is unmounted or if deadline changes
            return () => clearTimeout(timeoutId);
        }
    }, [deadline]);

    useEffect(() => {
        if (openInitTime) {
            const timer = setTimeout(() => {
                setOpenInitTime(false);
                resetTrial();
                setCountDeadline(prevCountDeadline => prevCountDeadline + 1);
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [openInitTime]);

    return (
        <div className={style.root}>
            <div className={style.choice}>
                <MTbutton id='left' onClick={(e) => handleResponseSelection(e)} disabled={disabled.mouveup} style={{ opacity: disabled.option ? 0 : 1 }}></MTbutton>
                <MTbutton id='right' onClick={(e) => handleResponseSelection(e)} disabled={disabled.mouveup} style={{ opacity: disabled.option ? 0 : 1 }}></MTbutton>
            </div>
            {/* <div className={style.number} style={{ justifyContent: trials[trialIndex].locationN === 'left' ? 'flex-start' : 'flex-end', opacity: disabled.stimuli ? 0 : 1 }}> */}
            <div className={style.number} style={{ opacity: disabled.stimuli ? 0 : 1 }}>
                <div style={{ opacity: trials[trialIndex]?.locationN === 'left' && !open ? 1 : 0 }}>
                    {trials[trialIndex]?.number}
                </div>
                <div style={{ opacity: trials[trialIndex]?.locationN === 'right' && !open ? 1 : 0 }}>
                    {trials[trialIndex]?.number}
                </div>
            </div>
            <div className={style.start}>
                <Button className='outlined' onClick={handleStartButtonClick} disabled={disabled.start}>+</Button>
            </div>
            <div className={style.fixation} style={{ opacity: disabled.start ? 0 : 1 }}>
                <Fixed />
            </div>
            <Dialog open={open}>
                <div className={style.containerDialog}>
                    <Typography variant='h2'>Attention!</Typography>
                    <Typography variant='h4'>{message}</Typography>
                </div>
            </Dialog>
            <Dialog open={openInitTime}>
                <div className={style.containerDialog}>
                    <Typography variant='h2'>Attention!</Typography>
                    <Typography variant='h4'>Vous avez dépassé le délai maximum de 1,5 seconde pour débuter l'essai. Soyez plus rapide! L'essai va recommencer.</Typography>
                </div>
            </Dialog>
            <Dialog open={newSession}>
                <div className={style.containerDialog}>
                    <Typography variant='h2'>Pause !</Typography>
                    <Typography variant='h4'>Vous allez passer à la session n°{session}/3</Typography>
                    <Button onClick={() => setNewSession(false)}>Débuter la session</Button>
                </div>
            </Dialog>
            <div className={style.count}>
                {trialIndex}
            </div>
        </div>
    )
}

export default Trials;