import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

import Header from '../src/components/Header';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Header />

      <QuizContainer>
        <QuizLogo />

        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Ghible Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (e) {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('fazendo submit');
              // router p/ praxima pagina
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosEvento) => {
                  setName(infosEvento.target.value);
                }}
                placeholder="Qual seu nome?"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Quizes da Galera</h2>
            <ul>
              {
                db.external.map((linkExterno) => {
                  const [projectName, gitHubUSer] = linkExterno.replace(/\//g, '')
                    .replace('https:', '').replace('.vercel.app', '')
                    .split('.');
                  return (
                    <li key={`link__${linkExterno}`}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${gitHubUSer}`}
                      >
                        {`${gitHubUSer}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })
              }
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gustavo-mf/aluraquiz-base" />
    </QuizBackground>
  );
}
