import React from 'react';

const Footer = () =>
{
    return (
        <div className='w-[100%] bg-gray-400 flex justify-center'>
            <div className='md:p-3 w-[100%] flex  flex-col items-center py-3'>
                <div className='flex gap-1 items-center text-center cursor-pointer'>
                    <h3 className='text-blue-800 font-bold text-xl '>
                        CareerNest
                    </h3>
                    <div className='text-sm'>@CopyRight 2025</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;