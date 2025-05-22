import React from 'react';
import { InputGroup } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { IoIosCloudyNight, IoIosSunny } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { degToRad, radToDeg } from 'three/src/math/MathUtils.js';
import { Checkbox } from '~/components/Checkbox';
import { updateSceneParams } from '~/store/Scenes/actions';
import {
    currentSceneDescriptor,
    currentSceneParams,
} from '~/store/Scenes/selectors';
import { ClassNameProps } from '~/utils/classNameProps';
import { roundWithPrecision } from '~/utils/roundWithPrecision';
import {
    DayButton,
    FormContentWrapper,
    InputGroupText,
    NaturalWidthControl,
    NightButton,
} from './parts';

export const Controls: React.FC<ClassNameProps> = ({ className }) => {
    const dispatch = useDispatch();
    const params = useSelector(currentSceneParams);
    const currentScene = useSelector(currentSceneDescriptor);

    if (!params) {
        return null;
    }

    return (
        <Form className={className}>
            <FormContentWrapper>
                <Form.Label>Pora dnia</Form.Label>
                <ButtonGroup>
                    <DayButton
                        variant="outline-primary"
                        active={!params.isNight}
                        onClick={() => {
                            if (params.isNight) {
                                dispatch(
                                    updateSceneParams({
                                        isNight: false,
                                    }),
                                );
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
                                dispatch(
                                    updateSceneParams({
                                        isNight: true,
                                    }),
                                );
                            }
                        }}
                        title="Noc"
                    >
                        <IoIosCloudyNight />
                    </NightButton>
                </ButtonGroup>
                <Form.Label htmlFor="background">Pokaż gwiazdy</Form.Label>
                <Checkbox
                    onClick={() =>
                        dispatch(
                            updateSceneParams({
                                backgroundEnabled: !params.backgroundEnabled,
                            }),
                        )
                    }
                    checked={params.backgroundEnabled}
                />
                <Form.Label>Kamera poruszana myszką</Form.Label>
                <Checkbox
                    onClick={() =>
                        dispatch(
                            updateSceneParams({
                                freeCameraEnabled: !params.freeCameraEnabled,
                            }),
                        )
                    }
                    checked={params.freeCameraEnabled}
                />
                <Form.Label>Kąt do patrzącego</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="range"
                        min="0"
                        max="360"
                        step="0.1"
                        value={radToDeg(params.angle)}
                        onChange={e =>
                            dispatch(
                                updateSceneParams({
                                    angle: degToRad(+e.target.value),
                                }),
                            )
                        }
                        disabled={params.freeCameraEnabled}
                    />
                    <NaturalWidthControl
                        type="number"
                        min="0"
                        max="360"
                        step="0.1"
                        value={(
                            roundWithPrecision(radToDeg(params.angle), 0.1) -
                            180
                        ).toFixed(1)}
                        validate={val =>
                            val !== undefined ? +val < 180 && +val > -180 : true
                        }
                        onChange={e => {
                            dispatch(
                                updateSceneParams({
                                    angle: degToRad(+e.target.value + 180),
                                }),
                            );
                        }}
                        disabled={params.freeCameraEnabled}
                    />
                    <InputGroupText>&#176;</InputGroupText>
                </InputGroup>
                <Form.Label>Odległość</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="range"
                        min={
                            currentScene?.details.camera.distanceLimits.min ??
                            65
                        }
                        max={
                            currentScene?.details.camera.distanceLimits.max ??
                            1000
                        }
                        step="1"
                        value={params.distance}
                        onChange={e =>
                            dispatch(
                                updateSceneParams({
                                    distance: +e.target.value,
                                }),
                            )
                        }
                        disabled={params.freeCameraEnabled}
                    />
                    <NaturalWidthControl
                        type="number"
                        min={
                            currentScene?.details.camera.distanceLimits.min ??
                            65
                        }
                        max={
                            currentScene?.details.camera.distanceLimits.max ??
                            1000
                        }
                        step="1"
                        value={Math.round(params.distance)}
                        validate={val =>
                            val !== undefined
                                ? +val >
                                      (currentScene?.details.camera
                                          .distanceLimits.min ?? 65) &&
                                  +val <
                                      (currentScene?.details.camera
                                          .distanceLimits.max ?? 1000)
                                : true
                        }
                        onChange={e => {
                            const val = +e.target.value;

                            dispatch(
                                updateSceneParams({
                                    distance: val,
                                }),
                            );
                        }}
                        disabled={params.freeCameraEnabled}
                    />
                    <InputGroupText>m</InputGroupText>
                </InputGroup>
            </FormContentWrapper>
        </Form>
    );
};
