import * as React from 'react';
import styled from 'styled-components';
import { Answer, AnsweredProps, VotesProps } from '../types';

import {
  useVotes,
  useBackgroundColor,
  useAnswer,
  useAnsweredStatus,
} from '../hooks';

const AnswerWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  border: 1px solid rgba(3, 12, 48, 0.2);
  border-radius: 5px;
  cursor: pointer;
`;

type ContentWrapperProps = {
  isBest: boolean;
  answered: number;
};

const ContentWrapper = styled.div`
  display: flex;
  margin: 5px 10px;
  align-items: center;
  justify-content: space-between;
  font-weight: ${({ isBest, answered }: ContentWrapperProps) =>
    isBest && answered !== -1 ? 'bold' : 'normal'};
`;

type ProgressAreaProps = {
  percentage: number;
  backgroundColor: string;
};

const ProgressArea = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  height: 100%;
  width: ${({ percentage }: ProgressAreaProps) => percentage + '%'};
  background: ${({ backgroundColor }: ProgressAreaProps) => backgroundColor};
  transition: ${({ percentage }: ProgressAreaProps) =>
    percentage ? `width 0.5s;` : `none;`};
`;

const CircleCheckMarkWrapper = styled.div`
  width: 17px;
  height: 20px;
  padding-left: 3px;
  margin-left: 10px;
  border: 1px solid #030c30;
  border-radius: 50%;
`;

const CircleCheckMark = () => (
  <CircleCheckMarkWrapper>&#10003;</CircleCheckMarkWrapper>
);

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  aIndex: number /* aIndex - index of the answer inside the selected question */;
};

export default function PollAnswer({ aIndex }: Props) {
  const { text }: Answer = useAnswer(aIndex);
  const { totalVotes, votesArray, increaseVotes }: VotesProps = useVotes();
  const { answered }: AnsweredProps = useAnsweredStatus();
  const votes: number = votesArray[aIndex];

  const [percentage, setPercentage] = React.useState(
    Math.round((votes / totalVotes) * 100)
  );
  const backgroundColor: string = useBackgroundColor(votesArray, aIndex);

  const selectAnswer = () => {
    if (answered === -1) {
      increaseVotes(aIndex);
    }
  };

  const mouseEnter = () => {
    if (answered !== -1) {
      const originPercentage = percentage;
      setPercentage(0);
      setTimeout(() => {
        setPercentage(originPercentage);
      }, 10);
    }
  };

  const statusPercentage = React.useMemo(() => percentage, []);
  const isBest = backgroundColor === 'rgba(0, 255, 255, 0.4)';

  return (
    <AnswerWrapper onClick={selectAnswer} onMouseEnter={mouseEnter}>
      {answered !== -1 ? (
        <ProgressArea
          percentage={percentage}
          backgroundColor={backgroundColor}
        />
      ) : (
        <ProgressArea percentage={0} backgroundColor={backgroundColor} />
      )}
      <ContentWrapper isBest={isBest} answered={answered}>
        <FlexWrapper>
          <div>{text}</div>
          {answered === aIndex && <CircleCheckMark />}
        </FlexWrapper>
        {answered !== -1 && <div>{statusPercentage + '%'}</div>}
      </ContentWrapper>
    </AnswerWrapper>
  );
}
