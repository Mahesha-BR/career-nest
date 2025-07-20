import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-screen bg-gray-400 flex justify-center items-center'>
     <span class="loader"></span>
    </div>
  );
};

export default Loader;
