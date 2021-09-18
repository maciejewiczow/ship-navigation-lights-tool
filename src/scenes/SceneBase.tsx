import { Environment, Sky, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useMemo } from 'react';
import starsPx from 'assets/Real Stars Skybox/px.png';
import starsNx from 'assets/Real Stars Skybox/nx.png';
import starsPy from 'assets/Real Stars Skybox/py.png';
import starsNy from 'assets/Real Stars Skybox/ny.png';
import starsPz from 'assets/Real Stars Skybox/pz.png';
import starsNz from 'assets/Real Stars Skybox/nz.png';
import { useSelector } from 'react-redux';
import { sceneParams } from 'store/Scenes/selectors';
import { WaterReplacer } from 'components/WaterReplacer';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useAngleLimitedLights } from './ThreeHooks/useAngleLimitedLights';

interface SceneBaseProps {
    sceneId: string;
}

export const SceneBase: React.FC<SceneBaseProps> = ({ sceneId, children }) => {
    const { scene, camera } = useThree();
    const { isNight } = useSelector(sceneParams(sceneId));

    const target = useMemo(() => scene.getObjectByName('Loaded scene')?.position, [scene]);

    useAngleLimitedLights();

    return (
        <React.Fragment>
            { children }
            {/* <axesHelper scale={[500, 500, 500]} /> */}
            {isNight ? (
                <React.Fragment>
                    <Environment files={[starsPx, starsNx, starsPy, starsNy, starsPz, starsNz]} background />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.1} />
                    </EffectComposer>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Sky scale={5000} inclination={0.7} rayleigh={0.1} mieCoefficient={0.02} azimuth={(3 * Math.PI) / 2} turbidity={0.05} />
                    <WaterReplacer placeholderName="Woda" />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[100, 100, 100]} />
                    <pointLight position={[-100, -100, -100]} />
                </React.Fragment>
            )}
            <OrbitControls camera={camera} target={target} maxPolarAngle={Math.PI / 2 - 0.01} />
        </React.Fragment>
    );
};
