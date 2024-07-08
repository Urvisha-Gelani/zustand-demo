import React from 'react';
import { ClipLoader } from 'react-spinners';
interface spinnerProps {
    status : boolean;
}
const  Spinner:React.FC<spinnerProps> =({status}) => {
    // const loading = useAppStore(state => state.loading)
    return (
        <div>
            <div className='flex justify-center items-center h-96'>
                <div className='h-2/4 flex items-center'>
                    <ClipLoader
                        loading={status}
                        color={"ng-blue-900"}
                        size={30}
                        speedMultiplier={1}
                        aria-label="Loading Spinner"
                        data-testid="loader" />

                </div></div>
        </div>
    );
}

export default Spinner;
