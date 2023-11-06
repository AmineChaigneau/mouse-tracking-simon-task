import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './training.module.css'
import Dialog from '../../components/dialog.styled';
import { Button, MTbutton } from '../../components/button.styled';
import useDeadlines from '../../hooks/useDeadlines';
import { Typography } from '../../components/styles/typography.styled';
import { ReactComponent as Fixed } from '../trials/fixed.svg'
import { setTrainingSequence, incrementTrainingIndex, resetTrainingIndex } from './trainingReducer'

function generateTrials() {
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

    // S'assurer qu'il y a exactement 40 essais
    return trials.slice(0, 40);
}

const Training = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State
    const trainings = useSelector(state => state.training.trainings);

    // const [trainings, setTrainings] = useState(generateTrials())
    const trainingIndex = useSelector(state => state.training.trainingIndex);

    const [disabled, setDisabled] = useState({ start: false, option: true, stimuli: true, mouveup: true });
    const [mousePos, setMousePos] = useState({});
    const [starting, setStarting] = useState();
    const [startTime, setStartTime] = useState(null);
    const [initime, setInitime] = useState(null);
    const [part, setPart] = useState(0);
    const [errCount, setErrCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [steps, setSteps] = useState({ step1: true, step2: false, step3: false })

    const [feedbackError, setFeedbackError] = useState(false);
    const [openRedirect, setOpenRedirect] = useState(false);
    const [openInitTime, setOpenInitTime] = useState(false);
    const startButtonDeadlineRef = useRef(null);

    const { message, deadline, endTime, meetMovementDeadline, resetDeadlines } = useDeadlines(startTime);

    // Set Trials
    useEffect(() => {
        const newTrials = generateTrials();
        dispatch(setTrainingSequence(newTrials));
    }, [part, dispatch]);

    // Actions
    const handleResponseSelection = (e) => {
        // feedback error
        if (e.target.id !== trainings[trainingIndex].directionN && trainingIndex > 20) {
            setErrCount(prevErrCount => prevErrCount + 1)
        }
        if (e.target.id !== trainings[trainingIndex].directionN && trainingIndex < 21) {
            setFeedbackError(true);
            resetDeadlines();
        } else {
            resetTrial();
            dispatch(incrementTrainingIndex());
        }
    }

    const handleFeedbackClose = () => {
        setFeedbackError(false);
        resetTrial();
        dispatch(incrementTrainingIndex());
    }

    const handleStartButtonClick = () => {
        setInitime(prevInitime => Date.now() - prevInitime)
        setStartTime(Date.now());  // Set startTime
        setStarting(mousePos.y);
        setDisabled({ ...disabled, option: false, start: true });

        if (startButtonDeadlineRef.current) {
            clearTimeout(startButtonDeadlineRef.current);
            setOpenInitTime(false);
        }
    }

    const resetTrial = () => {
        setStartTime(null);
        setStarting(null);
        setMousePos({});
        setDisabled({ start: false, option: true, stimuli: true, mouveup: true });
        resetDeadlines();
        if (trainingIndex > 10 && !steps.step3) {
            startButtonDeadlineRef.current = setTimeout(() => {
                setOpenInitTime(true);
            }, 1500);
        }
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

    // Deadline
    useEffect(() => {
        if (deadline && trainingIndex > 10 && !feedbackError) {
            setOpen(true)
            const timeoutId = setTimeout(() => {
                setOpen(false);
                resetTrial();
                dispatch(incrementTrainingIndex());
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
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [openInitTime]);

    useEffect(() => {
        if (disabled.mouveup) {  // Ensure this effect only runs when the trial has started
            if (mousePos.y <= starting - 50) {
                meetMovementDeadline();
                setDisabled({ ...disabled, mouveup: false, stimuli: false });
            }
        }
    }, [mousePos, starting, meetMovementDeadline]);

    // End
    useEffect(() => {
        if (trainingIndex === 40) {
            setOpenRedirect(true)
            if (startButtonDeadlineRef.current) {
                clearTimeout(startButtonDeadlineRef.current);
                setOpenInitTime(false);
            }
        } else if (trainingIndex === 10) {
            console.log('maintenant, attention aux deadlines!') // dialog state open ici
            setSteps({ ...steps, step2: true })
        } else if (trainingIndex === 20) {
            console.log('Plus de feedback, mais on donnera les resultats a la fin')
            setSteps({ ...steps, step3: true })
        }
    }, [trainingIndex])

    return (
        <div className={style.root}>
            <div className={style.choice}>
                <MTbutton id='left' onClick={(e) => handleResponseSelection(e)} disabled={disabled.mouveup} style={{ opacity: disabled.option ? 0 : 1 }}></MTbutton>
                <MTbutton id='right' onClick={(e) => handleResponseSelection(e)} disabled={disabled.mouveup} style={{ opacity: disabled.option ? 0 : 1 }}></MTbutton>
            </div>
            <div className={style.number} style={{ opacity: disabled.stimuli ? 0 : 1 }}>
                <div style={{ opacity: trainings[trainingIndex]?.locationN === 'left' && !open ? 1 : 0 }}>
                    {trainings[trainingIndex]?.number}
                </div>
                <div style={{ opacity: trainings[trainingIndex]?.locationN === 'right' && !open ? 1 : 0 }}>
                    {trainings[trainingIndex]?.number}
                </div>
            </div>
            <div className={style.start}>
                <Button className='outlined' onClick={handleStartButtonClick} disabled={disabled.start}>+</Button>
            </div>
            <div className={style.fixation} style={{ opacity: disabled.start ? 0 : 1 }}>
                <Fixed />
            </div>
            <div className={style.count}>
                {trainingIndex}
            </div>
            <Dialog open={feedbackError}>
                <div className={style.containerDialog}>
                    <Typography variant='h2' style={{ color: 'red' }}>Erreur</Typography>
                    <Typography variant='h4'>
                        Tu as fait une erreur ! Pour le chiffre <b>{trainings[trainingIndex]?.number}</b> ({trainings[trainingIndex]?.number < 5 ? 'inférieur' : "supérieur"} à 5), il faut selectionner <b>l'option à {trainings[trainingIndex]?.directionN === 'left' ? 'gauche' : 'droite'}</b>.
                    </Typography>
                    {/* image */}
                    <Button onClick={handleFeedbackClose}>C'est compris !</Button>
                </div>
            </Dialog>
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
            <Dialog open={openRedirect}>
                <div className={style.containerDialog}>
                    <Typography variant='h2'>Prêt ?</Typography>
                    <Typography variant='h4'>blablabla</Typography>
                    <Button onClick={() => navigate('/trials')}>Débuter l'expérimentation</Button>
                </div>
            </Dialog>
            <Dialog open={steps.step1} width='50%'>
                <div className={style.containerDialogSteps}>
                    <Typography variant='h4' style={{ textAlign: 'center', marginBottom: 20 }}>
                        Bienvenue à la session d'entraînement. Vous allez vous familiariser avec la tâche en effectuant <b>40 tentatives d'entraînement</b>.
                    </Typography>
                    <Typography variant='h4'>
                        Vous allez débuter part 10 essais, <b>avec un retour sur la réponse</b> (si vous faites une erreur) et <b>sans limite de temps</b>.
                    </Typography>
                    <Typography variant='h4'>
                        Après avoir cliqué sur sur le bouton '<b>+</b>' situé au centre en bas de l'écran, vous devrez selectionner le plus <b>rapidement et précisément</b> une des deux options en fonction du chiffre affiché à l'écran.
                        Vous devez sélectionner <b>l'option gauche</b> pour les chiffres <b>inférieurs à 5</b> et <b>l'option droite</b> pour les chiffres <b>supérieurs à 5</b>, en ignorant la position spatiale du chiffre sur l'écran (si le chiffre est situé à gauche ou à droite).
                    </Typography>
                    <Button onClick={() => setSteps({ ...steps, step1: false })}>Commencer</Button>
                </div>
            </Dialog>
            <Dialog open={steps.step2} width='50%'>
                <div className={style.containerDialogSteps}>
                    <Typography variant='h4'>
                        Super ! Pour les 10 prochains essais, vous aurez toujours <b>un retour sur la réponse</b> (si vous faites une erreur).
                    </Typography>
                    <Typography variant='h4'>
                        Attention, maintenant, les essais vont prendre en compte <b>les temps limites de réponse</b>.
                    </Typography>
                    <Typography variant='h4'>
                        Vous avez un <b>délai maximum de 1,5 seconde</b> pour débuter l'essai ('+'), puis un délai de <b>1,5 seconde</b> pour déplacer la souris vers le haut et déclencher l'apparition du chiffre.
                        Enfin, vous avez 2 secondes pour sélectionner le <b>rapidement et précisément</b> que possible la réponse.
                    </Typography>
                    <Button onClick={() => setSteps({ ...steps, step2: false })}>Continuer</Button>
                </div>
            </Dialog>
            <Dialog open={steps.step3} width='50%'>
                <div className={style.containerDialogSteps}>
                    <Typography variant='h4'>
                        Parfait ! Pour la fin de la session d'entraînement, vous allez vous retrouver dans <b>les mêmes conditions</b> que lors de l'expérience.
                    </Typography>
                    <Typography variant='h4'>
                        Vous n'aurez donc <b>pas accès au feedback</b> sur la réponse ( s'il s'agit d'une erreur ou non). Les <b>mêmes délais de temps s'appliquent</b> lors de ces essais. En cas d'erreur de timing, l'essai est annulé.
                    </Typography>
                    <Typography variant='h4'>
                        Les résultats (votre "performance") vous seront communiqués à la fin de la session, dans les mêmes conditions que pour l'expérience.
                    </Typography>
                    <Button onClick={() => setSteps({ ...steps, step3: false })}>Continuer</Button>
                </div>
            </Dialog>
            <Dialog open={openRedirect}>
                <div className={style.containerDialogSteps}>
                    <Typography variant='h4'>
                        Super ! Vous <b>avez terminé</b> l'entraînement.
                    </Typography>
                    <Typography variant='h4'>
                        Vous avez fait <b>{(errCount * 100) / 20}%</b> d'erreur!
                    </Typography>
                    <Typography variant='h4' style={{ textAlign: 'center' }}>
                        Vous pouvez maintenant débuter l'expérimentation.
                    </Typography>
                    <Button onClick={() => navigate('/trials')}>Débuter l'expérimentation !</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Training