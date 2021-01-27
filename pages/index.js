import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

import Header from '../src/components/Header';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Header />

      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>hello</h1>
          </Widget.Header>
          <Widget.Content>
            <p>there</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>hello</h1>
            <p>there</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gustavo-mf/aluraquiz-base" />
    </QuizBackground>
  );
}
