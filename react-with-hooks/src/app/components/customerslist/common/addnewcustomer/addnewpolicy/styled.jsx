import styled from 'styled-components';

import {Animated as AnimatedCSS} from 'react-animated-css';

//  constants
import {
  spacerMd,
  spacerLg,
  flexCC,
  flexFeC,
  flexFsCWrap,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';
import { flexFsC } from '../../../../../constants/styles';
  
export const AddNewPolicy = styled.div`
  width: 40%;
  padding: ${spacerLg};
  border-radius: 4px;
  background-color: #FFF;
  position: relative;
  z-index: 4;
`;

export const Animated = styled(AnimatedCSS)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

export const AddNewPolicyOverlay = styled.div`
  ${flexCC}
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
  ${flexFsC}
  width: 100%;
  margin-bottom: ${spacerMd};
`;

export const Title = styled.h2`
  font-size: ${getSizeWrtWidth(18)};
  color: #0f203f;
  font-weight: 700;
  margin: 0;
`;

export const Content = styled.div`
  ${flexFsCWrap}
  `;
  
  export const FormField = styled.div`
  width: 50%;
  padding-left: ${props => props.pL ? spacerMd : 0};
  padding-right: ${props => props.pR ? spacerMd : 0};
`;

export const ActionButtons = styled.div`
  ${flexFeC}
  width: 100%;
  margin: ${spacerMd} 0 0 0;
`;