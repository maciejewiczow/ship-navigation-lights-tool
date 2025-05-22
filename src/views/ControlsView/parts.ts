import { TfiAngleLeft } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 12px 24px;
    max-width: 700px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const BackLink = styled(Link)`
    text-decoration: none;

    .btn {
        margin-left: calc(-1 * var(--bs-btn-padding-x));
        display: flex;
        gap: 6px;
        align-items: center;
    }
`;

export const BackIcon = styled(TfiAngleLeft)`
    margin-top: 1px;
`;
