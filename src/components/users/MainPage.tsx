import React from 'react';
import imageSrc1 from '../../assets/image1.png'
import imageSrc2 from '../../assets/image2.png'

export default function MainPage() {
    return (
        <>

            <div className='h-screen w-full flex flex-wrap'>
                <div className='w-1/2 '>
                    <div className='h-full w-full bg-[#ECBC76]'>
                        <div className='h-full flex flex-wrap items-center justify-center'>
                            <img src={imageSrc1} className='' />
                        </div>

                    </div>
                </div>
                <div className='w-1/2 '>
                    <div className='w-full h-full'>
                        <div className='flex flex-wrap items-center justify-center'>
                            <img src={imageSrc2} />
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    );
}


