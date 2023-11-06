import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { updateStartTime } from '../stimuli/stimuliReducer';
import { updateTimeLimit, updateSessionNb, updateTrialsNb } from '../utils/utilsReducer';
import { updateTrainingIndex } from '../training/trainingReducer';
import { TextArea } from '../../components/textarea.styled';
import { Button } from '../../components/button.styled';
import style from './intro.module.css'
import { resetStore } from '../../app/store'; 

const Intro = () => {
  const [timeLimit, setTimetimeLimit] = useState(1.5);
  const [session, setSession] = useState(3);
  const [trials, setTrials] = useState(256);
  const [training, setTraining] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartExperiment = () => {
    // dispatch(updateStartTime());
    dispatch(updateTimeLimit(timeLimit));
    dispatch(updateSessionNb(session));
    dispatch(updateTrialsNb(trials));
    dispatch(updateTrainingIndex(training));
    navigate('/form');
  };

  return (
    <div className={style.root}>
      <h1>Settings</h1>
      <div className={style.form}>
        <div className="form-group">
          <label htmlFor="timeLimit">Time display stimuli (s) (only number):</label>
          <TextArea
            id="timeLimit"
            value={timeLimit}
            onChange={(e) => setTimetimeLimit(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="session">Number of session:</label>
          <TextArea
            id="session"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="trials">Number of trials:</label>
          <TextArea
            id="trials"
            value={trials}
            onChange={(e) => setTrials(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="trials">State of training (40 = skip):</label>
          <TextArea
            id="training"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
          />
        </div>
        <Button onClick={handleStartExperiment}>Start</Button>
        <Button className='outlined' onClick={() => dispatch(resetStore())}>Réinitialiser le Store</Button>
      </div>
    </div>
  );
};

export default Intro;
