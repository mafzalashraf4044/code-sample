import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

//  constants
import {
  spacerSm,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';
  
export const Input = styled(TextField)`
  width: 100%;
  margin-bottom: ${spacerSm}!important;

  .MuiFormLabel-root {
    font-size: ${getSizeWrtWidth(14)};
    color: #525c6e;
    font-weight: 700;

    &.Mui-focused {
      font-size: ${getSizeWrtWidth(12)};
      color: #868b96;
      transform: translate(0, 1.5px) scale(1);
    }
  }

  .MuiInput-underline:after,
  .MuiInput-underline:before,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid #dcdfe4;
  }
`;