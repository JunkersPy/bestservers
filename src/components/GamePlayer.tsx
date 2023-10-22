import { ReactNode, createContext, useRef, useState } from "react";

type GameplayerType = {
    setInternal: React.Dispatch<React.SetStateAction<string | undefined>>;
    setExternal: React.Dispatch<React.SetStateAction<string | undefined>>;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameplayerCtx = createContext<GameplayerType | null>(null);

export default function GamePlayer({ children }: { children: ReactNode }) {
    const [internal, setInternal] = useState<string | undefined>();
    const [external, setExternal] = useState<string | undefined>();
    const [visible, setVisible] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const iframe = useRef<HTMLIFrameElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    const contextValue = {
        setInternal,
        setExternal,
        setVisible,
    };

    return (
        <GameplayerCtx.Provider value={contextValue}>
            {visible && (
                <>
                    <div className="gameplayer-header">
                        <h2>Game Player</h2>
                        <div onClick={() => setVisible(false)}>X</div>
                    </div>
                    <div className="gameplayer-content">
                        {internal && <canvas ref={canvas}></canvas>}
                        {external && (
                            <iframe src={external} allowFullScreen ref={iframe}></iframe>
                        )}
                        <div className="mx-auto">
                            <button
                                onClick={async () => {
                                    if (canvas.current) {
                                        await canvas.current.requestFullscreen();
                                    } else if (iframe.current) {
                                        await iframe.current.requestFullscreen();
                                    }
                                    setFullScreen(true);
                                }}
                                className="button"
                            >
                                Full Screen
                            </button>
                        </div>
                    </div>
                </>
            )}
            {children}
        </GameplayerCtx.Provider>
    );
}