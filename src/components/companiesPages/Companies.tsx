import Popup from 'reactjs-popup';
import AddUser from '../popup/AddUser';
import { FaLayerGroup } from 'react-icons/fa';
import { useEffect } from 'react';

function Companies() {
  useEffect(() => {
    
  } , [])
  return (
    <>
      <div>
        <div className='px-[30px] py-[10px]'>
          <div className='flex flex-wrap justify-between items-center '>
            <div className='w-[25%] text-3xl text-[#304463]'>
              <h1>Companies</h1>
            </div>
            {/* <div className='w-[60%]'>
                            <input className='flex h-10 w-11/12 rounded-md border  bg-[#f7f6e8] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                placeholder='Search...' />
                        </div> */}
            <div className='w-[10%]'>
              <Popup trigger={<button className='px-[10px] py-[9px] w-full bg-[#304463] text-white rounded-[8px] flex items-center justify-center gap-[8px] text-[15px]'>
                <span> Add </span>
                <FaLayerGroup className=' text-[20px]' />
              </button>}>
                {(close) => (
                  <AddUser close={close} title="Add User" />
                )}
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companies;
