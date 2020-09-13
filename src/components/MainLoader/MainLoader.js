import React from 'react';
import Loader from 'react-loader-spinner';
import './MainLoader.scss';

const MainLoader = () => (
  <div className="Loader">
    <Loader type="Oval" color="#4e3c53" height={80} width={80} />
  </div>
);

export default MainLoader;
