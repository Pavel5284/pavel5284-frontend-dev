import React, { useEffect, useRef, useState } from "react";
import {useTheme} from "@/common/utils/cookies/useTheme.ts";

interface VantaBackgroundProps {
    children: React.ReactNode;
    effect?: "birds" | "waves" | "fog" | "net" | "halo" | "globe" | "rings";
    className?: string;
}

export const VantaBackground: React.FC<VantaBackgroundProps> = ({
                                                                    children,
                                                                    effect = "birds",
                                                                    className = "",
                                                                }) => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [theme] = useTheme();


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const initVanta = async () => {
            if (!isClient || !vantaRef.current) return;

            if (vantaEffect && typeof vantaEffect.destroy === "function") {
                vantaEffect.destroy();
            }

            try {
                const THREE = await import("three");

                let VANTA_EFFECT: any;
                switch (effect) {
                    case "birds":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.birds.min")).default;
                        break;
                    case "waves":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.waves.min")).default;
                        break;
                    case "fog":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.fog.min")).default;
                        break;
                    case "net":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.net.min")).default;
                        break;
                    case "halo":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.halo.min")).default;
                        break;
                    case "globe":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.globe.min")).default;
                        break;
                    case "rings":
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.rings.min")).default;
                        break;
                    default:
                        // @ts-ignore
                        VANTA_EFFECT = (await import("vanta/dist/vanta.birds.min")).default;
                }

                const effectInstance = VANTA_EFFECT({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x88ff00,
                    backgroundColor: 0x252526,
                    backgroundAlpha: theme === 'dark' ? 1 : 0
                });

                setVantaEffect(effectInstance);
            } catch (error) {
                console.warn("Vanta.js failed to load:", error);
            }
        };

        initVanta();

        return () => {
            if (vantaEffect && typeof vantaEffect.destroy === "function") {
                vantaEffect.destroy();
            }
        };
    }, [isClient, effect]); // убрал darkMode отсюда

    // Отдельный эффект для обновления backgroundAlpha
    useEffect(() => {
        if (vantaEffect && typeof vantaEffect.setOptions === "function") {
            vantaEffect.setOptions({
                backgroundAlpha: theme === 'dark' ? 1 : 0
            });
        }
    }, [theme, vantaEffect]);

    if (!isClient) {
        return (
            <div
                className={className}
                style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                }}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            ref={vantaRef}
            className={className}
            style={{
                width: "100%",
            }}
        >
            <div style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
            }}>
                {children}
            </div>
        </div>
    );
};