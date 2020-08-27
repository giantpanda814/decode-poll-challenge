import * as React from 'react';

export type Question = {
  text: string;
};
export type Answer = {
  text: string;
  votes: number;
};
export type QandA = {
  question: Question;
  answers: Answer[];
};
export type QandAsDocument = {
  questions: QandA[];
};

export type VotesProps = {
  totalVotes: number;
  votesArray: number[];
  increaseVotes: (aIndex: number) => void;
};

export type AnsweredProps = {
  answered: number;
  setAnswered: React.Dispatch<number>;
};

export type ContextProps = [QandA, VotesProps, AnsweredProps];
