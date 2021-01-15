import React, { useCallback, useState } from 'react';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { Box, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab';
import {
  CustomAutocomplete,
  CustomTextField,
} from '../../../components/Inputs';
import { CustomButton } from '../../../components/Buttons';
import { ArrowBackIos } from '@material-ui/icons';
import {
  COUNTRIES,
  getCountryDataByName,
  getStateByName,
  US_STATES,
} from '../../../services/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { CustomModal } from '../../../components/Modal';
import { updateUserAddressInfo } from '../../../redux/actions';
import { Alert } from '../../../components/Alerts';
import API from '../../../services/API';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
  },
  griditem: {
    padding: theme.spacing(1),
  },
}));

export default () => {
  const { buttons, griditem } = useStyles();
  const { fetching, precheck, uuid, address } = useSelector(
    (state) => state.users,
  );

  const addresses = {
    address_1: address.address_1 || '',
    address_2: address.address_2 || '',
  };
  const city = address.city || '';
  const country = address.country
    ? getCountryDataByName(address.country)
    : null;
  const zipcode = address.zipCode || '';
  const state = address.state ? getStateByName(address.state) : null;
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/kyc/register/:id');

  const handleAddressChange = useCallback(
    (e) => {
      dispatch(
        updateUserAddressInfo({
          ...address,
          [e.target.name]: e.target.value,
        }),
      );
    },
    [dispatch, address],
  );

  const handleChangeCity = useCallback(
    (e) => {
      dispatch(
        updateUserAddressInfo({
          ...address,
          city: e.target.value,
        }),
      );
    },
    [dispatch, address],
  );

  const handleChangeCountry = useCallback(
    (e, option) => {
      if (option && option.abbr !== 'US') {
        dispatch(
          updateUserAddressInfo({
            ...address,
            country: option ? option.name : '',
            state: '',
          }),
        );
      } else {
        dispatch(
          updateUserAddressInfo({
            ...address,
            country: option ? option.name : '',
          }),
        );
      }
    },
    [dispatch, address],
  );

  const handleChangeZip = useCallback(
    (e) => {
      // remove the filtering for now. Just a free text field
      // const testZip = /^\d+$/
      // if ( testZip.test( e.target.value ) || e.target.value === '' ) {
      dispatch(
        updateUserAddressInfo({
          ...address,
          zipCode: e.target.value,
        }),
      );
      // }
    },
    [dispatch, address],
  );

  const handleChangeState = useCallback(
    (e, option) => {
      dispatch(
        updateUserAddressInfo({
          ...address,
          state: option ? option.name : '',
        }),
      );
    },
    [dispatch, address],
  );

  const sentTo = (steps) => {
    if (match) {
      history.push(`/kyc/register/${steps}`);
    } else {
      history.push(`/precheck/kyc/${steps}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!checkValidation()) {
      setError(false);
      try {
        if (!uuid) {
          sentTo(1);
        } else {
          await API.post('/users/location', {
            uuid,
            address_1: addresses.address_1,
            address_2: addresses.address_2,
            city,
            country: country ? country.name : '',
            zipcode: zipcode || null,
            state: state ? state.name : '',
          });
        }
        sentTo(3);
      } catch (error) {
        setSubmitting(false);
        setError(true);
      }
    } else {
      setSubmitting(false);
      setError(true);
    }
  };

  const handleBackBtn = () => {
    sentTo(1);
  };

  const checkValidation = () => {
    return (
      !addresses.address_1 ||
      !city ||
      !country ||
      (country.abbr === 'US' && !state)
    );
  };

  let render = (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {error ? (
        <Grid container>
          <Grid item xs className={griditem}>
            <Alert severity="error">
              Provide all the necessary and valid details.
            </Alert>
          </Grid>
        </Grid>
      ) : null}
      {!fetching ? (
        <>
          <Grid container>
            <Grid item xs className={griditem}>
              <CustomTextField
                value={addresses.address_1}
                onChange={handleAddressChange}
                label="Address 1"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                autoFocus
                name="address_1"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs className={griditem}>
              <CustomTextField
                value={addresses.address_2}
                onChange={handleAddressChange}
                label={
                  <Box component="span">
                    Address 2 (Apt, Suite, etc.) -{' '}
                    <Box component="span" style={{ fontStyle: 'italic' }}>
                      Optional
                    </Box>
                  </Box>
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="address_2"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomTextField
                value={city}
                onChange={handleChangeCity}
                label="City"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomAutocomplete
                id="nationality"
                options={COUNTRIES}
                value={country}
                onChange={handleChangeCountry}
                autoHighlight
                filterOptions={createFilterOptions({
                  matchFrom: 'start',
                  stringify: (option) => option.name,
                })}
                getOptionLabel={(option) => {
                  return `${option.icon} ${option.name}`;
                }}
                renderOption={(option) => (
                  <>
                    {option.icon} {option.name}
                  </>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="Country"
                    placeholder="Country"
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
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomTextField
                value={zipcode}
                onChange={handleChangeZip}
                label="Zip Code"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6} className={griditem}>
              <CustomAutocomplete
                id="state"
                options={US_STATES}
                value={state}
                onChange={handleChangeState}
                autoHighlight
                disabled={!country || country.abbr !== 'US'}
                filterOptions={createFilterOptions({
                  matchFrom: 'start',
                  stringify: (option) => option.name,
                })}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                renderOption={(option) => (
                  <>
                    ({option.abbr}) {option.name}
                  </>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="State"
                    placeholder="State"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={buttons}>
            <CustomButton startIcon={<ArrowBackIos />} onClick={handleBackBtn}>
              Back
            </CustomButton>
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

  if (!fetching && !uuid) {
    if (match) {
      render = <Redirect to="/" />;
    } else {
      render = <Redirect to="/precheck/kyc/1" />;
    }
  }

  if (precheck) {
    render = <Redirect to="/precheck/kyc/5" />;
  }

  return <> {render} </>;
};
