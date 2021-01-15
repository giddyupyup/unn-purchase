import styled from 'styled-components';
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  Container,
  TextField,
  FormControl,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core';
import { SvgSelectArrowIcon } from '../../../static/icons/SelectArrow';

//
export const StyledGrid = styled(Grid)``;

export const StyledHeaderGridRow = styled(Grid)`
  && {
    margin: 20px 0 35px;
  }
`;

export const StyledGridRow = styled(Grid)`
  && {
    margin: 35px 0;
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    margin: 0;
    padding: 18px 20px;
    background: #fff;
    box-shadow: none;
    border-radius: 10px;

    @media screen and (min-width: 960px) {
      padding: 24px 44px;
    }
  }
`;

export const StyledContainer = styled(Container)``;

export const Header = styled.h1`
  display: block;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;

export const Title = styled.h2`
  display: block;
  margin: 0 0 8px;
  padding: 0;
  color: #666;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  font-family: 'Open Sans', sans-serif;
`;

export const TitleCenter = styled(Title)`
  text-align: center;
`;

export const Description = styled.p`
  display: block;
  margin: 0 0 15px 0;
  padding: 0;
  color: #666;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Open Sans', sans-serif;

  @media screen and (min-width: 960px) {
    margin: 0 25px 15px 0;
  }
`;

export const DescriptionCenter = styled(Description)`
  margin: 25px 0;
  font-size: 16px;
  text-align: center;
`;

export const EstimatedTokensAmount = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  color: #666;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;

  span {
    display: block;
    margin: 0 0 0 4px;
  }
`;

export const TextFieldWrapper = styled.div`
  display: block;
  margin: 15px 0;

  @media screen and (min-width: 960px) {
    margin: 15px 50px 15px 0;
  }
`;

export const TextFieldValidation = styled.div`
  display: block;
  margin: 2px;

  span {
    color: #721c24;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
  }
`;

export const MetamaskInfo = styled.p`
  display: block;
  margin: 0 0 75px;
  padding: 0;
  color: #fff;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 24px;
  justify-content: center;
`;

export const TextFieldContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 6px 14px;
  border-radius: 8px;
  background: #f5f5f5;

  ${({ error }) => error && `border: 1px solid #721c24;`}}
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 100%;

    .MuiInputBase-root {
      color: #333;
      font-size: 24px;
      line-height: 25px;
      font-family: 'Open Sans', sans-serif;
    }

    .MuiInputBase-input {
      &::placeholder {
        color: #666;
        font-size: 18px;
      }
    }

    .MuiFilledInput-input {
      padding: 6px 12px 8px;
    }

    .MuiFilledInput-underline:after {
      border-bottom: none;
    }

    .MuiFilledInput-underline:before {
      border-bottom: none;
    }

    .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: none;
    }
  }
`;

export const SelectArrowIcon = styled(SvgSelectArrowIcon)``;

export const StyledFormControl = styled(FormControl)`
  display: flex;
`;

export const SelectFormControl = styled(FormControl)`
  && {
    display: flex;
    align-items: center;
    outline: none;

    .MuiInputBase-root {
      outline: none;
      margin: 0 14px;
    }
  }
`;

export const StyledSelect = styled(Select)`
  && {
    .MuiSelect-root {
      display: block;
      width: 100%;
      padding: 0 40px 0 0;
      color: #333;
      font-size: 24px;
      line-height: 33px;
      font-family: 'Open Sans', sans-serif;

      &:focus {
        background-color: transparent;
      }
    }

    .MuiSvgIcon-root {
      top: 55%;
      right: 0;
      position: absolute;
      pointer-events: none;
      transform: translateY(-50%);
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    display: block;
  }
`;

export const LeftWrapper = styled.div`
  margin: 0;

  @media screen and (min-width: 960px) {
    margin: 0 35px 0 0;
  }
`;

export const RightWrapper = styled.div`
  margin: 25px 0 0;

  @media screen and (min-width: 960px) {
    margin: 0 0 0 35px;
  }
`;

export const PriceWrapper = styled.div`
  margin: 10px 0 0;

  @media screen and (min-width: 960px) {
    margin: 30px 0 0;
  }
`;

export const PriceContent = styled.div`
  display: inline-block;
  min-width: 120px;
  margin: 0;
  padding: 15px 0;
  border-bottom: 1px solid #000;

  span {
    color: #333;
    font-size: 30px;
    line-height: 41px;
    font-family: 'Open Sans', sans-serif;
  }
`;

export const LockListWrapper = styled.div`
  display: block;
  margin: 0;
`;

export const CheckboxLabel = styled.div``;

export const StyledCircularProgress = styled(CircularProgress)``;

export const StyledLinearProgress = styled(LinearProgress)`
  && {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  margin: 5rem 0;
  align-items: center;
  justify-content: center;
`;

export const TransactionAlertStatus = styled(Paper)`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 65px;
    border-radius: 6px;
    background-color: #2e2e3e;

    span {
      display: inline-block;
      margin: 0 0 0 16px;
      color: #bab0ff;
      font-weight: 500;
      font-family: 'Open Sans', sans-serif;
    }
  }
`;
