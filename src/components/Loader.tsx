import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const ChildrenWrapper = styled.div`
    width: 100%;
    color: white;
    margin-top: 20px;
    text-align: center;
`;

const AnimationWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 1px;

    width: 100px;
    height: 100px;

    /* width: 100%; */
`;

const Box = styled.div<{ delay: string }>`
    background: transparent;
    color: white;

    animation: fade 2s infinite;
    animation-delay: ${({ delay }) => delay};

    @keyframes fade {
        0% {
            background: transparent;
        }
        25% {
            background: white;
        }
        50%,
        100% {
            background: transparent;
        }
    }
`;

export const Loader: React.FC<PropsWithChildren> = ({ children }) => (
    <Wrapper>
        <AnimationWrapper>
            {Array.from({ length: 16 }).map((_, i) => (
                <Box
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    delay={`${((i % 4) + Math.floor(i / 4)) * 140}ms`}
                />
            ))}
        </AnimationWrapper>
        <ChildrenWrapper>{children ?? 'Ładowanie...'}</ChildrenWrapper>
    </Wrapper>
);
