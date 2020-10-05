import styled from 'styled-components';

import { Scrollbars as RCScrollbars } from 'react-custom-scrollbars';

export const Scrollbars = styled(RCScrollbars)`
  width: 100%;

  &:active,
  &:hover {
    .track-vertical {
      opacity: 1;
    }
  }
`;
  
export const ThumbVertical = styled.div`
  border-radius: 5px;
  background-color: ${props => props.thumbColor};
`;

export const TrackVertical = styled.div`
  opacity: 0;
  right: 2px;
  top: 0px;
  position: absolute;
  height: 100%;
  padding: 2px 0;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  -moz-transition: opacity 0.5s ease;
  -webkit-transition: opacity 0.5s ease;
  -o-transition: opacity 0.5s ease;
  background-color: transparent;
`;

export const View = styled.div`
  padding-right: 2px;
`;
