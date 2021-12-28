import styled, { css } from 'styled-components';
import { Controls as OriginalControls } from 'components/Controls';
import { Html as OriginalHtml } from '@react-three/drei';

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

    transition: all 0.2s ease-in-out;
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

    ${({ open, handleHeight }) => !open && css`
        transform: translateY(calc(-100% + ${handleHeight}px));
    `}
`;

export const Controls = styled(OriginalControls)`
    padding: 12px 18px;
    background: white;
    border-bottom-left-radius: 3px;
`;

export const Html = styled(OriginalHtml)`
    background: black;
    /* padding: 12px; */
`;
