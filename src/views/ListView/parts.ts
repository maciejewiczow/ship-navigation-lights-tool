import Card from 'react-bootstrap/esm/Card';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 12px 24px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Header = styled.header`
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;
`;

export const SearchInput = styled.input`
    padding: 8px 12px;
    width: 90%;
    border: 1px solid transparent;
    border-bottom: 2px solid #777;
`;

export const CardWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;

    > * {
        width: 300px;
    }
`;
