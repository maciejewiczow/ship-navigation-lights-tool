import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push, replace } from 'redux-first-history';
import { sceneMap } from '~/scenes';
import { loadScene } from '~/store/Scenes/actions';
import { withDefault } from '~/utils/withDefault';
import {
    ButtonLink,
    Card,
    CardBody,
    CardImg,
    CardsWrapper,
    CardText,
    Header,
    NewWindowButton,
    NewWindowIcon,
    NoResultsIcon,
    NoResultsWrapper,
    SearchInput,
    Wrapper,
} from './parts';

export const ListView: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && inputRef.current === document.activeElement) {
            setSearchText('');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [onKeyPress]);

    const openSceneInNewWindow = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();

        if (!sceneMap.has(id)) {
            return;
        }

        dispatch(loadScene(sceneMap.get(id)!));
        const popup = window.open(
            `/scene/${id}?noControls`,
            'scene',
            `height=${screen.availHeight},width=${screen.availWidth},fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,directories=no,status=no`,
        );

        popup?.addEventListener('load', () => {
            popup.addEventListener('unload', () => {
                dispatch(replace('/'));
            });
        });

        dispatch(push('/controls'));
    };

    return (
        <Wrapper>
            <Header>
                <SearchInput
                    ref={inputRef}
                    type="text"
                    placeholder="Szukaj..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </Header>
            <CardsWrapper>
                {withDefault(
                    Array.from(sceneMap.values())
                        .filter(({ name }) =>
                            name
                                .toLowerCase()
                                .includes(searchText.trim().toLowerCase()),
                        )
                        .map(({ name, id, iconPath }) => {
                            return (
                                <Card key={id}>
                                    <CardImg
                                        variant="top"
                                        src={iconPath}
                                    />
                                    <CardBody>
                                        <CardText>{name}</CardText>
                                        <ButtonGroup>
                                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                            {/* @ts-ignore another bogus error */}
                                            <Button
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-ignore
                                                as={ButtonLink}
                                                to={`/scene/${id}`}
                                                variant="outline-primary"
                                            >
                                                Otwórz w tym oknie
                                            </Button>
                                            <NewWindowButton
                                                onClick={openSceneInNewWindow(
                                                    id,
                                                )}
                                            >
                                                Otwórz w nowym oknie
                                                <NewWindowIcon />
                                            </NewWindowButton>
                                        </ButtonGroup>
                                    </CardBody>
                                </Card>
                            );
                        }),
                    <NoResultsWrapper>
                        <NoResultsIcon />
                        <h2>Pusto</h2>
                    </NoResultsWrapper>,
                )}
            </CardsWrapper>
        </Wrapper>
    );
};
