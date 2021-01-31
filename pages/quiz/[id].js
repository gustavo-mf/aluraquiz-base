/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUSer] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${gitHubUSer}.vercel.app/api/db`).then((respServer) => {
      if (respServer.ok) {
        return respServer.json();
      }
      throw new Error('Falha em pegar os dados');
    })
      .then((respConvertidaObj) => respConvertidaObj)
      .catch((err) => {
        console.error(err);
      });

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
