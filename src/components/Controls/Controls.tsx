import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { IoIosCloudyNight, IoIosSunny } from 'react-icons/io';
import { sceneParams } from 'store/Scenes/selectors';
import { ClassNameProps } from 'utils/classNameProps';
import { updateSceneParams } from 'store/Scenes/actions';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { SceneParams } from 'store/Scenes/store';
import { DayButton, NightButton } from './parts';

interface ControlsProps extends ClassNameProps {
    sceneId: string;
}

const createUpdateScene = (sceneId: string) => (params: Partial<SceneParams>) => updateSceneParams(sceneId, params);

export const Controls: React.FC<ControlsProps> = ({ sceneId, className }) => {
    const dispatch = useDispatch();
    const params = useSelector(sceneParams(sceneId));
    const updateScene = useMemo(() => createUpdateScene(sceneId), [sceneId]);

    if (!params)
        return null;

    return (
        <Form className={className}>
            <Form.Group controlId="angle">
                <Form.Label>Kąt do patrzącego (stopnie)</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="360"
                    step="0.1"
                    value={radToDeg(params.angle)}
                    onChange={e => dispatch(updateScene({ angle: degToRad(+e.target.value) }))}
                />
                {Math.round(radToDeg(params.angle))}&#176;
            </Form.Group>
            <Form.Group controlId="daytime">
                <Form.Label>Dzień/noc</Form.Label>
                <ButtonGroup>
                    <DayButton
                        variant="outline-primary"
                        active={!params.isNight}
                        onClick={() => {
                            if (params.isNight) {
                                dispatch(updateScene({
                                    isNight: false,
                                }));
                            }
                        }}
                        title="Dzień"
                    >
                        <IoIosSunny />
                    </DayButton>
                    <NightButton
                        variant="outline-primary"
                        active={params.isNight}
                        onClick={() => {
                            if (!params.isNight) {
                                dispatch(updateScene({
                                    isNight: true,
                                }));
                            }
                        }}
                        title="Noc"
                    >
                        <IoIosCloudyNight />
                    </NightButton>
                </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="background">
                <Form.Label>Pokaż gwiazdy</Form.Label>
                <Form.Check
                    type="checkbox"
                    checked={params.backgroundEnabled}
                    onChange={e => dispatch(updateScene({ backgroundEnabled: e.target.checked }))}
                />
            </Form.Group>
            <Form.Group controlId="cameraheight">
                <Form.Label>Wysokość kamery</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={params.cameraHeight}
                    onChange={e => dispatch(updateScene({ cameraHeight: +e.target.value }))}
                />
                {params.cameraHeight}m
            </Form.Group>
        </Form>
    );
};
