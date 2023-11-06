import Intro from './features/intro/intro'
import Form from './features/form/form'
import Instructions from './features/instructions/instructions';
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import FullScreen from './utils/fullScreen'
import './App.css'
import Calibration from './features/calibration/calibration';
import Training from './features/training/training';
import Trials from './features/trials/trials';
import End from './features/end/end';

function App() {

  const theme = {
    colors: {
      background: {
        main: '#FFFFFF'
      },
      primary: {
        main: '#2EA44F',
        light: '#a3d4b1',
        text: 'black'
      }
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <FullScreen>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/form" element={<Form />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/calibration" element={<Calibration />} />
          <Route path="/training" element={<Training />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/end" element={<End />} />
        </Routes>
        </FullScreen>
      </ThemeProvider>
    </div>
  );
}

export default App;
