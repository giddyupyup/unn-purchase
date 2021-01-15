import styled from 'styled-components';
import { Grid, Paper, Container } from '@material-ui/core';

import { SvgCelebrateIcon } from '../../../static/icons/CelebrateIcon';

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
    padding: 24px 44px;
    background: #fff;
    box-shadow: none;
    border-radius: 10px;
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

export const Description = styled.p`
  display: block;
  margin: 0 25px 15px 0;
  padding: 0;
  color: #666;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Open Sans', sans-serif;
`;

export const CelebrateIcon = styled(SvgCelebrateIcon)`
  && {
    margin: 0 0 50px;
    width: 200px;
    height: 120px;
  }
`;

export const TransactionPaper = styled(Paper)`
  && {
    display: block;
    margin: 74px 24px 24px;
    padding: 26px 38px 16px;
    box-shadow: none;
    border-radius: 8px;
    background: #fff;

    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin: 0 0 10px;
      width: 100%;
      color: #000;
      font-size: 28px;
      font-family: 'Open Sans', sans-serif;
      text-align: center;

      span {
        display: inline-block;
        margin: 0 6px;
        color: #7e6cff;
        font-family: 'Open Sans', sans-serif;
      }
    }
  }
`;
