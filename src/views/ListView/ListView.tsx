import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { BiLinkExternal } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import sceneMap from 'scenes';
import { withDefault } from 'utils/withDefault';
import {
    Header,
    Wrapper,
    CardsWrapper,
    SearchInput,
    NoResultsWrapper,
    NoResultsIcon,
    HorizontalCardBody,
    CardStyleWrapper,
    WholeCardLink,
    InnerLink,
} from './parts';

export const ListView: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && inputRef.current === document.activeElement)
            setSearchText('');
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [onKeyPress]);

    const openInNewWindow = (href: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(
            href,
            'scene',
            // eslint-disable-next-line no-restricted-globals
            `height=${screen.availHeight},width=${screen.availWidth},fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,directories=no,status=no`,
        );
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
                {
                    withDefault(
                        Array.from(sceneMap.values())
                            .filter(({ name }) => name.toLowerCase().includes(searchText.trim().toLowerCase()))
                            .map(({ name, id, iconPath }) => (
                                <CardStyleWrapper key={id}>
                                    <Card>
                                        <WholeCardLink to={`/scene/${id}`} />
                                        <Card.Img variant="top" src={iconPath} />
                                        <HorizontalCardBody>
                                            <Card.Text>{name}</Card.Text>
                                            <InnerLink
                                                title="Otwórz w nowym oknie"
                                                onClick={openInNewWindow(`/scene/${id}?noControls`)}
                                            >
                                                <BiLinkExternal />
                                            </InnerLink>
                                        </HorizontalCardBody>
                                    </Card>
                                </CardStyleWrapper>
                            )),
                        (
                            <NoResultsWrapper>
                                <NoResultsIcon />
                                <h2>Pusto</h2>
                            </NoResultsWrapper>
                        ),
                    )
                }
            </CardsWrapper>
        </Wrapper>
    );
};
