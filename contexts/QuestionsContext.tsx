import * as React from 'react';
import { QandA, Answer, ContextProps } from '../types';

const QuestionsContext = React.createContext<ContextProps>([
  {
    question: {
      text: '',
    },
    answers: [],
  },
  { totalVotes: 0, votesArray: [], increaseVotes: () => {} },
  { answered: -1, setAnswered: () => {} },
]);

type Props = {
  qIndex: number;
  questions: QandA[];
  children: React.ReactNode;
};

const QuestionsProvider = ({ qIndex, children, questions }: Props) => {
  const { question, answers }: QandA = questions[qIndex];

  const [votesArray, setVotesArray] = React.useState<number[]>(
    answers.map((answer: Answer) => answer.votes)
  );

  const increaseVotes = (aIndex: number) => {
    const newVotesArray = [...votesArray];
    newVotesArray[aIndex] += 1;
    setVotesArray(newVotesArray);
    setAnswered(aIndex);
  };

  const totalVotes = votesArray.reduce(
    (sum: number, votes: number) => (sum += votes),
    0
  );

  const [answered, setAnswered] = React.useState<number>(-1);

  return (
    <QuestionsContext.Provider
      value={[
        { question, answers },
        { totalVotes, votesArray, increaseVotes },
        { answered, setAnswered },
      ]}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContext, QuestionsProvider };
