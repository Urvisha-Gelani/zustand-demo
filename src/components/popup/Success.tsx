import React from 'react';
interface Props {
    sucessfullMsg : string;
}
const Success: React.FC<Props> = (props) =>  {
    return (
        <>
            <div className='w-full'>
                <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-4 mb-4">
                    <div className="flex items-center justify-between space-x-4">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-green-600"

                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">
                                {props.sucessfullMsg}
                            </p>
                        </div>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 cursor-pointer text-green-600"


                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Success;
