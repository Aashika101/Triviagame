// ApiResultPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiResultPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/external/external-data'); // Fetch from your backend
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='p-6 bg-gray-900 text-white'>
            <h2 className='text-2xl font-bold mb-4'>API Results</h2>
            {data && (
                <div>
                    <h3 className='text-lg font-semibold'>Fetched Image:</h3>
                    <img src={data.question} alt="Fetched from API" className='mt-2 mb-4 max-w-full h-auto' /> {/* Display the image */}
                    <p>Solution: {data.solution}</p> {/* Display the solution */}
                </div>
            )}
        </div>
    );
};

export default ApiResultPage;