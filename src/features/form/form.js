import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateInfoPlayer } from './formReducer';
import { Select } from '../../components/select.styled';
import { TextArea } from '../../components/textarea.styled';
import { Button } from '../../components/button.styled';
import style from './form.module.css';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../components/styles/typography.styled';

const Form = () => {
    const [age, setAge] = useState('');
    const [genre, setGenre] = useState('');
    const [profession, setProfession] = useState('');
    const [main, setMain] = useState('');
    const [mainSouris, setMainSouris] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'age':
                setAge(value);
                break;
            case 'genre':
                setGenre(value);
                break;
            case 'profession':
                setProfession(value);
                break;
            case 'main':
                setMain(value);
                break;
            case 'souris':
                setMainSouris(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const infoPlayer = {
            age,
            genre,
            profession,
            main,
            mainSouris,
        };
        dispatch(updateInfoPlayer(infoPlayer));
        // Reset the form
        setAge('');
        setGenre('');
        setProfession('');
        setMain('');
        setMainSouris('');
        navigate('/instructions')
    };

    const isFormComplete = age && genre && profession && main && mainSouris;

    return (
        <div className={style.root}>
            <div className={style.header}>
                <Typography variant={'h4'}>Informations nécessaires</Typography>
            </div>
            <div className={style.consigne}>
                <Typography>Veuillez compléter le formulaire ci dessous. Les informations resterons anonymes et confidentielles.</Typography>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.content}>
                    <Select
                        id="age"
                        name="age"
                        onChange={handleChange}
                        value={age}
                        required
                    >
                        <option value="">Age *</option>
                        <option value={20}>15-20</option>
                        <option value={25}>21-25</option>
                        <option value={30}>26-30</option>
                        <option value={35}>31-35</option>
                        <option value={40}>36-40</option>
                        <option value={45}>41-45</option>
                        <option value={50}>46-50</option>
                        <option value={55}>51-55</option>
                        <option value={60}>56-60</option>
                        <option value={65}>61-65</option>
                        <option value={70}>66-70</option>
                        <option value={75}>70+</option>
                    </Select>
                </div>
                <div className={style.content}>
                    <Select
                        id="genre"
                        name="genre"
                        onChange={handleChange}
                        value={genre}
                        required
                    >
                        <option value="">Genre *</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                    </Select>
                </div>
                <div className={style.content}>
                    <p className={style.label}>Quelle est votre profession ?</p>
                    <TextArea
                        id="profession"
                        name="profession"
                        value={profession}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.content}>
                    <p className={style.label}>Quelle est votre main dominante ?</p>
                    <Select
                        id="main"
                        name="main"
                        //label="Quelle est votre main dominante ?"
                        onChange={handleChange}
                        value={main}
                        required
                    >
                        <option value="">Main dominante</option>
                        <option value="d">Droite</option>
                        <option value="g">Gauche</option>
                    </Select>
                </div>
                <div className={style.content}>
                    <p className={style.label}>Quelle est votre main sur la souris ?</p>
                    <Select
                        id="souris"
                        name="souris"
                        //label="Quelle est votre main sur la souris ?"
                        onChange={handleChange}
                        value={mainSouris}
                        required
                    >
                        <option value="">Main sur la souris</option>
                        <option value="d">Droite</option>
                        <option value="g">Gauche</option>
                    </Select>
                </div>
                <div className={style.button}>
                    <Typography>
                        En poursuivant, je donne mon consentement à l'utilisation des données me concernant sous forme anonyme et agrégée, à des fins de recherche scientifique. <br /> J'accepte volontairement de participer à l'étude et je comprends que je peux me retirer de l'étude à tout moment, sans donner d'explications.
                    </Typography>
                    <Button type="submit" disabled={!isFormComplete}>
                        Valider
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;
