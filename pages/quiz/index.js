/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';

import db from '../../db.json';
import Widget from '../../src/components/widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  const router = useRouter();
  const nomeParticipante = router.query.name;
  const labelNome = (nomeParticipante && nomeParticipante.length > 0 ? `, ${nomeParticipante}` : '');
  return (
    <Widget>
      <Widget.Header style={{ display: 'inline-block' }}>
        <BackLinkArrow href="/" />
        Muito bem
        <strong>{labelNome}</strong>
        . Aqui esta o resultado do quiz:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {
            results.reduce((somatorioAtual, question) => {
              const isAcerto = question.isCorrect === true;
              if (isAcerto) {
                return somatorioAtual + 1;
              }
              return somatorioAtual;
            }, 0)
          }
          {' '}
          perguntas.
        </p>
        <ul>
          {results.map((question, index) => {
            const questionIndex = index + 1;
            return (
              <li key={`question__${questionIndex}`}>
                <strong>
                  #
                  {
                    (questionIndex < 10 ? '0' : '') + questionIndex
                  }
                </strong>
                <span className="questionName">{ ` ${question.title}` }</span>
                { question.isCorrect === true ? ' Acertou' : ' Errou' }
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Loader
          type="Oval"
          color={db.theme.colors.primary}
          height={100}
          width={100}
          timeout={0}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const [showLabelBtnConfirmar, setshowLabelBtnConfirmar] = React.useState(true);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Imagem ilustrativa"
        src={question.image}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm onSubmit={(infosEvento) => {
          infosEvento.preventDefault();
          setIsQuestionSubmited(true);
          setshowLabelBtnConfirmar(false);
          setTimeout(() => {
            addResult(
              { title: question.title, isCorrect },
            );
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            setshowLabelBtnConfirmar(true);
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}

              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            { !showLabelBtnConfirmar
            && (
              <Loader
                type="Oval"
                color={db.theme.colors.contrastText}
                height={30}
                width={30}
                timeout={0}
              />
            )}

            { showLabelBtnConfirmar && 'Confirmar' }

          </Button>

          {
            isQuestionSubmited && isCorrect
            && (
              <Widget.QuestionResult>
                <IoCheckmarkSharp style={{ color: db.theme.colors.success }} />
              </Widget.QuestionResult>
            )
          }

          {
            isQuestionSubmited && !isCorrect
            && (
              <Widget.QuestionResult>
                <IoCloseSharp style={{ color: db.theme.colors.wrong }} />
              </Widget.QuestionResult>
            )
          }

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce didmount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
    // Gambis pra desmarcar o input da questão anterior
    const inputCheked = document.querySelector('input:checked');
    if (inputCheked) {
      inputCheked.checked = false;
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingScreen />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}

// definir prop types
