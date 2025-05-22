/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from 'react-bootstrap';
import OriginalCard from 'react-bootstrap/esm/Card';
import { BiLinkExternal } from 'react-icons/bi';
import styled from 'styled-components';
import ReactComponent from '~/assets/undraw_No_data_re_kwbl.svg?react';
import { InvisibleLink } from '~/components/InvisibleLink';

export const Wrapper = styled.div`
    padding: 12px 24px;
    max-width: 1400px;
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
    justify-content: center;
    align-items: stretch;
    gap: 16px;

    > * {
        width: 300px;
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
    margin-bottom: 22px;
    margin-right: 14px;
`;

// @ts-ignore same issue with bootstrap + drei
export const CardBody = styled(OriginalCard.Body)`
    min-height: 130px;
    display: flex;
    flex-direction: column;
`;

// @ts-ignore same issue with bootstrap + drei
export const Card = styled(OriginalCard)`
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 0 20px -1px rgba(0, 0, 0, 0.3);
    }
`;

export const CardImg = styled(OriginalCard.Img)`
    object-fit: contain;
    background: black;
    height: 200px;
`;

// @ts-ignore same issue with bootstrap + drei
export const NewWindowButton = styled(Button).attrs({
    variant: 'outline-secondary',
})`
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    align-items: center;
`;

export const NewWindowIcon = styled(BiLinkExternal)`
    font-size: 32px;
`;

export const CardText = styled(OriginalCard.Text)`
    flex: 1;
`;

export const ButtonLink = styled(InvisibleLink)`
    color: var(--bs-btn-color);
`;
