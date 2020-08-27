import * as React from 'react';

import { QuestionsContext } from './contexts/QuestionsContext';
import {
  ContextProps,
  QandA,
  Answer,
  VotesProps,
  AnsweredProps,
} from './types';

export function useVotes(): VotesProps {
  const context: ContextProps = React.useContext(QuestionsContext);
  return context[1];
}

export function useQuestion(): QandA {
  const context: ContextProps = React.useContext(QuestionsContext);
  return context[0];
}

export function useAnswer(aIndex: number): Answer {
  const { answers }: QandA = useQuestion();
  return answers[aIndex];
}

export function useAnsweredStatus(): AnsweredProps {
  const context: ContextProps = React.useContext(QuestionsContext);
  return context[2];
}

export function useBackgroundColor(
  percentages: number[],
  index: number
): string {
  const percentage = percentages[index];
  if (percentage === Math.max(...percentages)) {
    return 'rgba(0, 255, 255, 0.4)';
  }

  return 'rgba(192, 192, 192, 0.4)';
}
