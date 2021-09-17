import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import sceneMap from 'scenes';
import { InvisibleLink } from 'components/InvisibleLink';
import { Header, Wrapper, CardWrapper, SearchInput } from './parts';

export const ListView: React.FC = () => {
    const [searchText, setSearchText] = useState('');
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
            <CardWrapper>
                {Array.from(sceneMap.values())
                    .filter(({ name }) => name.toLowerCase().includes(searchText.trim().toLowerCase()))
                    .map(({ name, endpoint, iconPath }) => (
                        <InvisibleLink to={`/scene/${endpoint}`}>
                            <Card>
                                <Card.Img variant="top" src={iconPath} />
                                <Card.Body>
                                    <Card.Text>{name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </InvisibleLink>
                    ))}
            </CardWrapper>
        </Wrapper>
    );
};
