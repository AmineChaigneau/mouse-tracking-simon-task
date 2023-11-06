import { useRef, useEffect, useCallback } from "react";
import useFullscreenStatus from "./useFullScreenStatus";
import { Button } from '../components/button.styled'
import Dialog from "../components/dialog.styled";
import style from "./fullScreen.module.css"
import { Typography } from "../components/styles/typography.styled";
import useWindowDimensions from '../hooks/useWindowDimensions';
import { updateScreenSize } from "../features/utils/utilsReducer";
import { useDispatch } from 'react-redux';

const FullScreen = ({ children }) => {

    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateScreenSize({ height: height, width: width}));
    }, [height, width])

    const maximizeElement = useRef(null);
    let isFullscreen, setIsFullscreen;
    let errorMessage;

    try {
        [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizeElement);
    } catch (e) {
        errorMessage = "Fullscreen not supported";
        isFullscreen = false;
        setIsFullscreen = undefined;
    }

    const handleClick = () => {
        setIsFullscreen();
        console.log(isFullscreen)
    }

    const fullScreenMode = useCallback(() => {
        console.log(`browser dectect fullSreenMode: ${isFullscreen}`)
    }, [isFullscreen])

    useEffect(() => {
        !isFullscreen && fullScreenMode();
    }, [isFullscreen, fullScreenMode])

    return (
        <div ref={maximizeElement}
            style={{ background: '#fff' }}
        >
            {errorMessage ? (
                <div>
                    Fullscreen mode is not supported by your browser.
                </div>
            ) : (
                <>
                    <Dialog open={!isFullscreen}>
                        <div className={style.container}>
                            <Typography variant={'h4'}>FULLSCREEN REQUIRED</Typography>
                            <div className={style.content}>
                                <Typography>
                                    By continuing your browser will use <strong style={{ color: 'red' }}>the entire display surface of your screen</strong> (i.e. fullscreen mode). You will not be able to interact with the experiment if fullscreen mode is not enabled.
                                </Typography>
                                <Button onClick={handleClick}>Switch to fullscreen mode</Button>
                            </div>
                        </div>
                    </Dialog>
                    <div style={{ overflow: 'auto' }}>
                        {children}
                    </div>
                </>
            )}
        </div >
    )
}

export default FullScreen