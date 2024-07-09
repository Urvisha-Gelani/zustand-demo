import React from 'react';

interface deleteProps {
    message: string;
    id?: number | undefined;
    close: () => void;
    deleteUse: (id: number | undefined) => void
}

const Delete: React.FC<deleteProps> = ({ message, id, close, deleteUse }) => {

    const removeData = (id?:number | undefined) => {
        if (id === undefined) {
            deleteUse()
        } else {
            deleteUse(id)
        }
    }

    return (
        <>
            <div className='text-center w-[100%] mx-auto'>
                <p>{message}</p>
                <div className='flex flex-wrap justify-center gap-1 mt-5'>
                    <button
                        type="submit"
                        className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5"
                        onClick={() => removeData(id)}
                    >
                        Yes
                    </button>
                    <button
                        type="submit"
                        className="relative inline-flex  items-center justify-center 
                                                 bg-red-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:text-black focus:bg-black-100 w-1/5"
                        onClick={() => close()}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default Delete;

