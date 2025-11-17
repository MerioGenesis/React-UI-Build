import { useState, useEffect } from 'react';
import API from '../api/API.js';
import Table from '../UI/Table.js';
import { ActionTray, ActionAdd } from '../UI/Actions.js';
import VehicleForm from '../entities/vehicles/VehicleForm.js';




export default function AllVehicles() {
    // Initialization ----------------------------
    const endpoint = `/vcharter/vehicles/`;

    // State -------------------------------------
    const [vehicles, setVehicles] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');

    const [showNewVehicleForm, setShowNewVehicleForm] = useState(false);


    // Context -----------------------------------
    // Methods -----------------------------------
    const getVehicles = async (endpoint) => {
        const response = await API.get(endpoint);
        response.isSuccess
            ? setVehicles(response.result)
            : setLoadingMessage(response.message);
    }

    useEffect(() => {
        getVehicles(endpoint);
    }, [endpoint]);

    const handleAdd = () => setShowNewVehicleForm(true);
    const handleDismissAdd = () => setShowNewVehicleForm(false);

    const handleSubmit = async (newVehicle) => {
        const response = await API.post(endpoint, newVehicle);
        return response.isSuccess
            ? getVehicles() || true
            : false;

    }
    //View ---------------------------------------
    return (
        <section>
            <ActionTray>
                <ActionAdd showText onClick={handleAdd} buttonText="Add Vehicle" />
            </ActionTray>
            {showNewVehicleForm && <VehicleForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />}

            <h1>All Vehicles</h1>
            {
                <Table
                    data={vehicles}
                    columns={[
                        { key: 'v_id', label: '#' },
                        { key: 'v_name', label: 'Name' },
                        { key: 'v_brand', label: 'Brand' },
                        { key: 'v_seatsNo', label: 'Seats Number' },
                        { key: 'v_year', label: 'Year' },
                        { key: 'v_plate', label: 'Plate' },
                        { key: 'v_imageURL', label: 'Image' },
                        { key: 'v_vt_id', label: 'Vehicle Type' },
                    ]} />
            }
        </section>

    )
}