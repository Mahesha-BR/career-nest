import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Model = ( props ) =>
{
  return (
    <div className='bg-black/50 fixed top-0 left-0 inset-0 z-40 flex justify-center items-center'>
      <div className='w-[95%] md:w-[45%] h-[470px] bg-white rounded-xl p-10'>
        <div className='flex justify-between '>
          <div className='felx gap-4 items-center'>
            <div className='text-2xl font-semibold'>{ props.title }</div>
          </div>
          <div onClick={ () => props.closeModel() } className='cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
        {/* Put children inside modal box */ }
        <div>{ props.children }</div>
      </div>
    </div>
  );
};

export default Model;
