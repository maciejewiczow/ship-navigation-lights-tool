import styled from 'styled-components';
import { Controls as OriginalControls } from 'components/Controls';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;

    position: relative;
`;

export const DrawerHandle = styled.div`
    color: white;
    padding: 12px 18px;
    font-size: 32px;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
`;

export const ControlsDrawer = styled.div<{ open: boolean; handleHeight: number }>`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;

    transition: transform 0.2s ease-in-out;

    ${DrawerHandle} {
        height: ${({ handleHeight }) => handleHeight}px;
    }

    ${({ open, handleHeight }) => (!open ? `
        transform: translateY(calc(-100% + ${handleHeight}px));
    ` : ''
    )}
`;

export const Controls = styled(OriginalControls)`
    padding: 12px 18px;
    background: white;
`;
