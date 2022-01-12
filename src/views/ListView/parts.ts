import styled from 'styled-components';
import { ReactComponent } from 'assets/undraw_No_data_re_kwbl.svg';
import OriginalCard from 'react-bootstrap/esm/Card';
import { InvisibleLink } from 'components/InvisibleLink';

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

export const CardsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;

    > * {
        width: 300px;
        margin-right: 8px;
    }
`;

export const NoResultsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 32px;
    text-align: center;
    color: #888;
`;

export const NoResultsIcon = styled(ReactComponent)`
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 21px;
    margin-right: 14px;
`;

export const HorizontalCardBody = styled(OriginalCard.Body)`
    display: flex;
    flex-flow: row nowrap;
    max-height: 100px;

    .card-text {
        margin-bottom: 0;
    }
`;

export const WholeCardLink = styled(InvisibleLink)`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const CardStyleWrapper = styled.div`
    .card {
        position: relative;
        height: 100%;

        &:hover {
            color: #0a58ca;
        }

        a:not(${WholeCardLink}) {
            z-index: 3;
        }

        img {
            object-fit: contain;
            background: black;
            height: 100%;
        }
    }
`;

export const InnerLink = styled.a`
    font-size: 24px;
    color: initial;
    margin-left: 8px;

    display: flex;
    align-items: center;
    cursor: pointer;
`;
