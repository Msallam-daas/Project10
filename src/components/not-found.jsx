import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container text-center mt-5'>
      <h1 style={{ color: '#F596F6' }} className='mb-4'>
        <i className='fas fa-exclamation-circle'></i>
        &nbsp; Page Not Found
      </h1>
      <Link to='/' className='btn btn-navy'>
        GO BACK
      </Link>
    </div>
  );
};

export default NotFound;
