import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button.styled'
import style from './instructions.module.css'
import { Typography } from '../../components/styles/typography.styled'
import imageun from './ExpeRules.png'
import imagedeux from './ExpeMT.png'
import imagequatre from './ExpeCalibration.png'
import ReactPlayer from 'react-player';
import video from './Task.mp4'

// Explication tâche
const Un = ({ onClick }) => {
    return (
        <div className={style.content}>
            <div className={style.title}>
                <Typography variant='h2'>L'objectif !</Typography>
            </div>
            <div className={style.columns}>
                <div className={style.text}>
                    <Typography variant='h4'>
                        Dans cette tâche, il vous sera présenté des chiffres allant de <b>1 à 4</b> et de <b>6 à 9</b> sur l'écran. Votre objectif est de faire une décision binaire basée sur la valeur numérique des chiffres affichés.
                    </Typography>
                    <Typography variant='h4'>
                        Vous devez sélectionner <b>l'option gauche</b> pour les chiffres <b>inférieurs à 5</b> et <b>l'option droite</b> pour les chiffres <b>supérieurs à 5</b>, en ignorant la position spatiale du stimulus numérique sur l'écran, c'est-à-dire si le chiffre est situé à gauche ou à droite.
                    </Typography>
                    <Typography variant='h4'>
                        Cette tâche comprendra trois sessions, chacune d'une durée approximative de 15 minutes.
                    </Typography>
                </div>
                <img src={imageun} alt='imageRules'></img>
            </div>
            <div className={style.button}>
                <Button className='outlined' disabled={true}>
                    Précedent
                </Button>
                <Button onClick={onClick} disabled={false}>
                    Suivant
                </Button>
            </div>
        </div>
    )
}

// Explication Reponse
const Deux = ({ onClick, onPrev }) => {
    return (
        <div className={style.content}>
            <div className={style.title}>
                <Typography variant='h2'>Comment répondre ?</Typography>
            </div>
            <div className={style.columns}>
                <div className={style.text}>
                    <Typography variant='h4'>
                        <i>(A)</i> Vous commencerez chaque essai en cliquant sur le bouton '<b>+</b>' situé au centre en bas de l'écran dans un <b>délai maximum de 1,5 seconde</b>.
                    </Typography>
                    <Typography variant='h4'>
                        <i>(B)</i> Ensuite, vous devrez <b>déplacer la souris vers le haut</b> dans un délai de <b>1,5 seconde</b> pour déclencher l'apparition du chiffre sans délai.
                        <i>(C)</i> Réagissez aussi <b>rapidement et précisément</b> que possible en sélectionnant l'option gauche ou droite, en déplaçant la souris dans la boîte de réponse correspondante dans un <b>délai de 2 secondes</b>.
                    </Typography>
                    <Typography variant='h4'>
                        Une fois votre mouvement initial commencé, maintenez une trajectoire ascendante du mouvement de la souris.
                        Si vous ne respectez pas le délai à n'importe quelle étape de la procédure, <b>l'essai suivant sera initié</b> avec la représentation du bouton "<b>+</b>".
                    </Typography>
                </div>
                <img src={imagedeux} alt='imageTracking'></img>
            </div>
            <div className={style.button}>
                <Button className='outlined' onClick={onPrev} disabled={false}>
                    Précedent
                </Button>
                <Button onClick={onClick} disabled={false}>
                    Suivant
                </Button>
            </div>
        </div>
    )
}

// Video task
// const Trois = ({ onClick, onPrev }) => {
//     return (
//         <div className={style.content}>
//             <div className={style.title}>
//                 <Typography variant='h2'>Démonstration !</Typography>
//             </div>
//             <div className={style.columns}>
//                 <div className={style.text}>
//                     <Typography variant='h4'>
//                         Veuillez regarder <b>attentivement la vidéo</b>. Cette vidéo vous donnera un aperçu de l'expérience en direct.
//                         Une fois que vous aurez regardé la vidéo, vous pourrez passer à la suite.
//                     </Typography>
//                 </div>
//                 <div className={style.video}>
//                     Video
//                 </div>
//             </div>
//             <div className={style.button}>
//                 <Button className='outlined' onClick={onPrev} disabled={false}>
//                     Précedent
//                 </Button>
//                 <Button onClick={onClick} disabled={false}>
//                     Continuer
//                 </Button>
//             </div>
//         </div>
//     )
// }

// Calibration 
const Quatre = ({ onClick, onPrev }) => {
    return (
        <div className={style.content}>
            <div className={style.title}>
                <Typography variant='h2'>Familiarisation !</Typography>
            </div>
            <div className={style.columns}>
                <div className={style.text}>
                    <Typography variant='h4'>
                        Avant de commencer l'expérience principale, vous participerez à une <b>session de familiarisation</b> pour vous habituer à la tâche.
                        Pour ce faire, vous compléterez 20 essais pour chaque bouton de sélection (gauche et droite), <b>sans stimulus</b>, avec seulement une option (gauche puis droite) affiché à l'écran.
                        <i>Un compteur sera présent en bas à droite pour vous indiquez le nombre d'essai(n/20)</i>.
                    </Typography>
                    <Typography variant='h4'>
                        Votre objectif est de réaliser <b>un mouvement fluide et précis</b> vers le bouton de sélection, en visant à maintenir <b>la trajectoire la plus directe possible</b>.
                    </Typography>
                    <Typography variant='h4'>
                        Après chaque réponse, une <b>ligne grise</b> et une <b>ligne rouge</b> afficheront la trajectoire.
                        Vous répéterez cette tâche pour <b>20 essais</b> pour chaque bouton de sélection, ce qui vous permettra de vous familiariser avec le mouvement requis.
                    </Typography>
                    <Typography variant='h4'>
                        Les mêmes contraintes de temps que dans l'expérience de base seront appliquées: Vous aurez <b>1,5</b> seconde pour cliquer sur le bouton "+".  Ensuite, vous aurez <b>2</b> secondes pour déplacer la souris vers le bouton de selection.
                    </Typography>
                </div>
                <img src={imagequatre} alt='imageCalibration'></img>
            </div>
            <div className={style.button}>
                <Button className='outlined' onClick={onPrev} disabled={false}>
                    Précedent
                </Button>
                <Button onClick={onClick} disabled={false}>
                    Continuer
                </Button>
            </div>
        </div>
    )
}

// Video Calibration 
const Cinq = ({ onClick, onPrev }) => {

    const [isVideoPlayed, setIsVideoPlayed] = useState(false);

    const handleVideoEnd = () => {
        setIsVideoPlayed(true);
    };

    return (
        <div className={style.content}>
            <div className={style.title}>
                <Typography variant='h2'>Démonstration!</Typography>
            </div>
            <div className={style.columns}>
                <div className={style.text}>
                    <Typography variant='h4'>
                        Veuillez regarder <b>attentivement la vidéo</b>. Cette vidéo vous donnera un aperçu de l'étape de familiarisation et de l'expérience.
                        Une fois que vous aurez regardé la vidéo, vous pourrez passer à la suite.
                    </Typography>
                    <Typography variant='h4'>
                        <i>Vous pouvez mettre la video en plein écran.</i>
                    </Typography>
                </div>
                <div className={style.video}>
                    <ReactPlayer
                        url={video}
                        width='100%'
                        height='100%'
                        controls // Affiche les contrôles vidéo par défaut
                        onEnded={handleVideoEnd}
                    />
                </div>
            </div>
            <div className={style.button}>
                <Button className='outlined' onClick={onPrev} disabled={false}>
                    Précedent
                </Button>
                <Button onClick={onClick} disabled={!isVideoPlayed}>
                    Continuer
                </Button>
            </div>
        </div>
    )
}

// Training 
const Six = ({ onClick, onPrev }) => {
    return (
        <div className={style.content}>
            <div className={style.title}>
                <Typography variant='h2'>Dernière étape !</Typography>
            </div>
            <div className={style.columns}>
                <div className={style.text}>
                    <Typography variant='h4'>
                        Après la session de familiarisation, vous passerez à une session d'entraînement où vous serez autorisé à vous familiariser davantage avec la tâche en pratiquant <b>40 essais</b>:
                    </Typography>
                    <ul>
                        <Typography variant='h4'>
                            <li><b>10 essais</b> avec retour sur la réponse (si erreur) et sans limite de temps pour chaque étape de l'essai,</li>
                            <li><b>10 essais</b> avec retour sur la réponse et avec limite de temps,</li>
                            <li>et <b>20 essais</b> sans retour sur les erreurs et avec limite de temps.</li>
                        </Typography>
                    </ul>
                    <Typography variant='h4'>
                        Ces essais d'entraînement vous aideront à vous préparer pour l'expérience principale, en vous assurant que vous êtes à l'aise avec la tâche et les contraintes de temps associées.
                    </Typography>
                </div>
            </div>
            <div className={style.button}>
                <Button className='outlined' onClick={onPrev} disabled={false}>
                    Précedent
                </Button>
                <Button onClick={onClick} disabled={false}>
                    En continuant vous débuterez la session de familiarisation
                </Button>
            </div>
        </div>
    )
}

const Instructions = () => {

    const navigate = useNavigate();

    const [state, setState] = useState(1);

    const handleClick = () => {
        setState(state + 1)
    }

    const handlePrev = () => {
        setState(state - 1)
    }

    const handleRedirect = () => {
        navigate('/calibration')
    }

    const display = () => {
        switch (state) {
            case 1:
                return <Un onClick={handleClick} />
            case 2:
                return <Deux onClick={handleClick} onPrev={handlePrev} />
            // case 3:
            //     return <Trois onClick={handleClick} onPrev={handlePrev} />
            case 3:
                return <Quatre onClick={handleClick} onPrev={handlePrev} />
            case 4:
                return <Cinq onClick={handleClick} onPrev={handlePrev} />
            case 5:
                return <Six onClick={handleRedirect} onPrev={handlePrev} />
            default:
                return <div>Err</div>
        }
    }

    return (
        <div>
            <div className={style.root}>
                <div className={style.container}>
                    {display()}
                </div>
            </div>
        </div>
    )
}

export default Instructions