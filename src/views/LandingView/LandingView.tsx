import React from 'react';
import logo from 'assets/logo.svg';
import { Link, Logo, Wrapper, Header } from './parts';

export const LandingView: React.FC = () => (
    <Wrapper>
        <Header>
            <Logo src={logo} alt="logo" />
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <Link
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </Link>
        </Header>
    </Wrapper>
);
