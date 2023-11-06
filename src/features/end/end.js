import { Typography } from "../../components/styles/typography.styled"
import { Button } from "../../components/button.styled"
import { useSelector } from "react-redux"
import style from './end.module.css'

const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

const Confeti = ({ children }) => {
    return (
        <div className={style.hoverme}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            {children}
        </div>
    )
}

const End = () => {

    const trials = useSelector(state => state.trials.trials_completed);
    const calibrations = useSelector(state => state.calibration.trials);
    const subject_id = useSelector(state => state.trials.subject_id);

    const countErrors = (trialList) => {
        const totalTrials = trialList.length;
        const totalErrors = trialList.filter(trial => trial.error).length;
        const errorPercentage = (totalErrors / totalTrials) * 100;

        return {
            totalErrors: totalErrors,
            errorPercentage: errorPercentage.toFixed(2) // Arrondi à deux décimales
        };
    };

    const errorStats = countErrors(trials);

    const replacer = function (key, value) { return value === null ? '' : value }

    const handleClick = () => {
        const fields = Object.keys(trials[0])

        const tracking = trials.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(';');
        });

        const trackingWithSubjectId = tracking.map(line => `${subject_id};${line}`);

        const headers = ["subject_id; session; id; rt; init_time; tracking; response; condition; location; direction; stimuli; error; deadline"]

        console.log([...headers, ...trackingWithSubjectId].join('\n'))

        downloadFile({
            data: [...headers, ...trackingWithSubjectId].join('\n'),
            fileName: [subject_id, 'results.csv'].join('_'),
            fileType: 'text/csv',
        })
    }

    const handleClickCalibration = () => {
        const fields = Object.keys(calibrations[0])

        const tracking = calibrations.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(';');
        });

        const trackingWithSubjectId = tracking.map(line => `${subject_id};${line}`);

        const headers = ["subject_id; id; side; rt; tracking"]

        console.log([...headers, ...trackingWithSubjectId].join('\n'))

        downloadFile({
            data: [...headers, ...trackingWithSubjectId].join('\n'),
            fileName: [subject_id, 'calibrations.csv'].join('_'),
            fileType: 'text/csv',
        })
    }

    return (
        <div className={style.root}>
            <div className={style.container}>
                <Confeti>
                    <Typography variant='h1'>
                        Merci de votre participation.
                    </Typography>
                </Confeti>
                <div className={style.text}>
                    <Typography variant='h3'>
                        Vous avez fait {errorStats.errorPercentage}% d'erreur.
                    </Typography>
                </div>
            </div>
            <div className={style.download}>
                <Button onClick={handleClick}>
                    Telecharger les résultats
                </Button>
                <Button onClick={handleClickCalibration}>
                    Telecharger calibration
                </Button>
            </div>
        </div>
    )
}

export default End;