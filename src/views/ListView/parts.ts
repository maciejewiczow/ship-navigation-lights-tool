import styled from 'styled-components';
import { ReactComponent } from 'assets/undraw_No_data_re_kwbl.svg';

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
