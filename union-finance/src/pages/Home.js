import React, { useEffect } from 'react';

import { HomeHeader } from '../components/Headers';
// import { HomeFooter } from '../components/Footers';
import { HomeContainer } from '../containers/Home';

export default (props) => {
  useEffect(() => {
    document.title = 'Union Finance | Home';
  }, []);

  return (
    <>
      <HomeHeader home />
      <HomeContainer />
      {/* <HomeFooter /> */}
    </>
  );
};
