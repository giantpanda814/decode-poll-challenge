import * as React from 'react';
import styled from 'styled-components';

import PollAnswer from './PollAnswer';
import { QandAsDocument, QandA, Answer, VotesProps } from '../types';
import { QuestionsProvider } from '../contexts/QuestionsContext';
import { useVotes, useQuestion } from '../hooks';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  max-width: 400px;
  width: calc(100% - 40px);
  padding: 1.5em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  box-shadow: 0 0 15px rgba(3, 12, 48, 0.1);

  h2 {
    margin-top: 0;
  }
`;

const TotalVotesText = styled.p`
  opacity: 0.5;
  font-size: 14px;
`;

function PollWidget() {
  const { totalVotes }: VotesProps = useVotes();
  const { question, answers }: QandA = useQuestion();

  return (
    <PollWrapper>
      <h2>{question.text}</h2>
      {answers.map((_: Answer, i: number) => (
        <PollAnswer key={i} aIndex={i} />
      ))}
      <TotalVotesText>{totalVotes} votes</TotalVotesText>
    </PollWrapper>
  );
}

export default function Poll({ qandas }: Props) {
  console.log('questions and answers: ', qandas);

  const { questions }: QandAsDocument = qandas;
  const index: number = Math.floor(Math.random() * questions.length);

  return (
    <QuestionsProvider qIndex={index} questions={questions}>
      <PollWidget />
    </QuestionsProvider>
  );
}
