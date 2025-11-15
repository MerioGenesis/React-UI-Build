import { useState, useEffect } from 'react';
import API from '../api/API.js';
import Table from '../UI/Table.js';



export default function AllVehicles() {
    // Initialization ----------------------------
    const endpoint = `/vcharter/vehicles/`;

    // State -------------------------------------
    const [vehicles, setVehicles] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');

    // Context -----------------------------------
    // Methods -----------------------------------
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        response.isSuccess
            ? setVehicles(response.result)
            : setLoadingMessage(response.message);
    }

    useEffect(() => {
        apiCall(endpoint);
    }, [endpoint]);
    //View ---------------------------------------
    return (
        <section>
            <h1>All Vehicles</h1>
            {
                <Table data={vehicles} />
            }
        </section>
    )
}