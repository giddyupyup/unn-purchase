import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab';
import { Check } from '@material-ui/icons';
import {
  CustomAutocomplete,
  CustomCheckbox,
  CustomDatePicker,
  CustomTextField,
} from '../../../components/Inputs';
import { CustomButton } from '../../../components/Buttons';
import {
  COUNTRIES,
  getCountryDataByName,
  getCountryDataByCC,
  isEmail,
  OCCUPATIONS,
} from '../../../services/Utils';
import { Alert } from '../../../components/Alerts';
import API from '../../../services/API';
import { updateUserIdentity, updateUserInfo } from '../../../redux/actions';
import { CustomModal } from '../../../components/Modal';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
  },
  griditem: {
    padding: theme.spacing(1),
  },
  privacy: {
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ERROR_TEXT = {
  default: 'Provide all the necessary and valid details.',
  duplicate: ( eth ) => {
    return `This email is already associated with another address${ eth ? ' ...'+ eth.substring(eth.length - 4, eth.length) : ''}.
              Please use the original email associated with this address or use a different email.`
  }
}

export default () => {
  const { buttons, griditem, privacy } = useStyles();
  const { fetching, precheck, uuid, identity, email, phone, eth_address } = useSelector(
    (state) => state.users,
  );
  const name = {
    first: identity.firstName || '',
    middle: identity.middleName || '',
    last: identity.lastName || '',
  };

  const birthDate = identity.birthdate || null;
  const nationality = identity.nationality
    ? getCountryDataByName(identity.nationality)
    : null;
  const countryCode = identity.countryCode
    ? getCountryDataByCC(identity.countryCode)
    : null;
  const occupation = identity.occupation || null;

  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [whitePaperCheck, setWhitePaperCheck] = useState(false);
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState(ERROR_TEXT.default);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/kyc/register/:id');

  const handleNameChange = useCallback(
    (e) => {
      dispatch(
        updateUserIdentity({
          type: e.target.name,
          value: e.target.value,
        }),
      );
    },
    [dispatch],
  );

  const handleEmailChange = useCallback(
    (e) => {
      dispatch(
        updateUserInfo({
          type: 'email',
          value: e.target.value,
        }),
      );
    },
    [dispatch],
  );

  const handleBirthdate = useCallback(
    (date) => {
      dispatch(
        updateUserIdentity({
          type: 'birthdate',
          value: date,
        }),
      );
    },
    [dispatch],
  );

  const handleNationalityChange = useCallback(
    (e, option) => {
      dispatch(
        updateUserIdentity({
          type: 'nationality',
          value: option ? option.name : '',
        }),
      );
    },
    [dispatch],
  );

  const handleCountryCodeChange = useCallback(
    (e, option) => {
      dispatch(
        updateUserIdentity({
          type: 'countryCode',
          value: option ? option.codeint : '',
        }),
      );
    },
    [dispatch],
  );

  const handleChangePhone = useCallback(
    (e) => {
      const testPhone = /^\d+$/;
      if (testPhone.test(e.target.value) || e.target.value === '') {
        dispatch(
          updateUserInfo({
            type: 'phone',
            value: e.target.value,
          }),
        );
      }
    },
    [dispatch],
  );

  const handleOccupationChange = useCallback(
    (e, option) => {
      dispatch(
        updateUserIdentity({
          type: 'occupation',
          value: option ? option : '',
        }),
      );
    },
    [dispatch],
  );

  const handlePrivacyCheck = (e) => {
    setPrivacyCheck(e.target.checked);
  };

  const handleWhitePaperCheck = (e) => {
    setWhitePaperCheck(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!checkValidation()) {
      setError(false);
      try {
        let response;
        if ( eth_address ) {
          response = await API.post('/users/identity/eth', {
            firstName: name.first,
            middleName: name.middle,
            lastName: name.last,
            email,
            eth_address,
            birthdate: birthDate,
            nationality: nationality.name,
            countryCode: countryCode.codeint,
            phone,
            occupation,
          });
        } else if (!uuid) {
          response = await API.post('/users/identity', {
            firstName: name.first,
            middleName: name.middle,
            lastName: name.last,
            email,
            birthdate: birthDate,
            nationality: nationality.name,
            countryCode: countryCode.codeint,
            phone,
            occupation,
          });
        } else {
          response = await API.put('/users/identity', {
            uuid,
            firstName: name.first,
            middleName: name.middle,
            lastName: name.last,
            birthdate: birthDate,
            nationality: nationality.name,
            countryCode: countryCode.codeint,
            phone,
            occupation,
          });
        }
        // localStorage.setItem( 'user_uuid', response.data.data.user.uuid );
        dispatch(
          updateUserInfo({
            type: 'uuid',
            value: response.data.data.user.uuid,
          }),
        );
        setSubmitting(true);
        if (match) {
          history.push('/kyc/register/2');
        } else {
          history.push('/precheck/kyc/2');
        }
      } catch (error) {
        const { duplicate_user } = error.response.data;
        setErrorTxt( ERROR_TEXT.duplicate(duplicate_user.eth_address) )
        setSubmitting(false);
        setError(true);
      }
    } else {
      setSubmitting(false);
      setError(true);
    }
  };

  const checkValidation = () => {
    return (
      !name.first ||
      !name.last ||
      !email ||
      !birthDate ||
      !nationality ||
      !countryCode ||
      !phone ||
      !occupation ||
      !privacyCheck ||
      !whitePaperCheck ||
      !isEmail(email)
    );
  };

  let render = (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {error ? (
        <Grid container>
          <Grid item xs className={griditem}>
            <Alert severity="error">
              { errorTxt }
            </Alert>
          </Grid>
        </Grid>
      ) : null}
      {!fetching ? (
        <>
          <Grid container>
            <Grid item xs={12} lg={4} className={griditem}>
              <CustomTextField
                value={name.first}
                onChange={handleNameChange}
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                autoFocus
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} lg={4} className={griditem}>
              <CustomTextField
                value={name.middle}
                onChange={handleNameChange}
                label={
                  <Box component="span">
                    Middle Name -{' '}
                    <Box component="span" style={{ fontStyle: 'italic' }}>
                      Optional
                    </Box>
                  </Box>
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="middleName"
              />
            </Grid>
            <Grid item xs={12} lg={4} className={griditem}>
              <CustomTextField
                value={name.last}
                onChange={handleNameChange}
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="lastName"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs className={griditem}>
              <CustomTextField
                value={email}
                onChange={handleEmailChange}
                label="Email"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                type="email"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomDatePicker
                variant="inline"
                autoOk
                disableFuture
                label="Birthdate"
                format="MM/dd/yyyy"
                placeholder="mm/dd/yyyy"
                value={birthDate}
                onChange={handleBirthdate}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomAutocomplete
                id="nationality"
                value={nationality}
                onChange={handleNationalityChange}
                options={COUNTRIES}
                autoHighlight
                filterOptions={createFilterOptions({
                  matchFrom: 'start',
                  stringify: (option) => option.name,
                })}
                getOptionLabel={(option) => `${option.icon} ${option.name}`}
                renderOption={(option) => (
                  <>
                    {option.icon} {option.name}
                  </>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="Nationality"
                    placeholder="Nationality"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={3} className={griditem}>
              <CustomAutocomplete
                id="country-code"
                options={COUNTRIES}
                value={countryCode}
                onChange={handleCountryCodeChange}
                autoHighlight
                filterOptions={createFilterOptions({
                  matchFrom: 'start',
                  stringify: (option) => option.name,
                })}
                getOptionLabel={(option) => {
                  return `${option.icon} +${option.code}`;
                }}
                renderOption={(option) => (
                  <>
                    {option.icon} {option.name} (+{option.code})
                  </>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="Phone Number"
                    placeholder="Country Code"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={9} className={griditem}>
              <CustomTextField
                label="&nbsp;"
                type="tel"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={phone}
                onChange={handleChangePhone}
                placeholder="Phone Number"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs className={griditem}>
              <CustomAutocomplete
                value={occupation}
                onChange={handleOccupationChange}
                id="occupation"
                options={OCCUPATIONS}
                autoHighlight
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="Occupation"
                    placeholder="Occupation"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={privacyCheck}
                    onChange={handlePrivacyCheck}
                    checkedIcon={<Check />}
                    name="terms"
                  />
                }
                label={
                  <Typography component="span" color="textPrimary">
                    I agree to Union's{' '}
                    <Box
                      className={privacy}
                      component="a"
                      href="https://www.unn.finance/privacy-notice/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Box>
                    .
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={whitePaperCheck}
                    onChange={handleWhitePaperCheck}
                    checkedIcon={<Check />}
                    name="terms"
                  />
                }
                label={
                  <Typography component="span" color="textPrimary">
                    I have read and understood{' '}
                    <Box
                      className={privacy}
                      component="a"
                      href="https://unn.finance/wp-content/uploads/2020/10/UNION-Whitepaper-DRAFT.Oct_.2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      the whitepaper
                    </Box>
                    .
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={buttons}>
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={checkValidation()}
            >
              Next
            </CustomButton>
          </Grid>
        </>
      ) : null}
      <CustomModal open={fetching || submitting}>
        <CircularProgress />
      </CustomModal>
    </form>
  );

  if (precheck) {
    render = <Redirect to="/precheck/kyc/5" />;
  }

  if (!eth_address) {
    render = <Redirect to="/" />;
  }

  return <>{render}</>;
};
