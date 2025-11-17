import { useState, useEffect } from "react";
import FormItem from "../../UI/Form.js";
import API from "../../api/API.js";
import { ActionTray, ActionAdd, ActionClose } from "../../UI/Actions.js";

const emptyVehicle = {
    v_name: "Merio Car",
    v_brand: "Genesis",
    v_seatsNo: 5,
    v_year: "",
    v_plate: "XYZ-1234",
    v_imageURL: "https://example.com/vehicle.jpg",
    v_vt_id: 1,
}

export default function VehicleForm({ onDismiss, onSubmit, initialVehicle = emptyVehicle }) {
    // Initialization ---------------------------

    const isValid = {
        v_name: (name) => name.length > 2,
        v_brand: (brand) => brand.length > 2,
        v_seatsNo: (seatsNo) => seatsNo > 0,
        v_year: (date) => {
            if (!date) return false;
            const selected = new Date(date);
            const minDate = new Date("01-01-2010"); //Car must be produced after 2010
            return selected > minDate;
        },
        v_plate: (plate) => plate.length > 2,
        v_imageURL: (url) => (/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url)),
        v_vt_id: (vt_id) => vt_id !== 0,

    }

    const errorMessage = {
        v_name: "Vehicle name must be at least 3 characters long.",
        v_brand: "Vehicle brand must be at least 3 characters long.",
        v_seatsNo: "Vehicle seating number must be greater than 0.",
        v_year: "Vehicle production date must be a valid year.",
        v_plate: "Vehicle plate number must be at least 3 characters long.",
        v_imageURL: "Vehicle image URL must be correct URL address.",
        v_vt_id: "Vehicle type must be selected.",
    }



    // State -------------------------------------
    const [vehicle, setVehicle] = useState(initialVehicle);
    const [errors, setErrors] = useState(
        Object.keys(initialVehicle).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

    const [vehicleTypes, setVehicleTypes] = useState(null);
    const [loadingTypesMessage, setLoadingTypesMessage] = useState("Loading vehicle types...");

    const getTypes = async () => {
        const response = await API.get('/vcharter/vehicletypes/');
        response.isSuccess
            ? setVehicleTypes(response.result)
            : setLoadingTypesMessage(response.message);
    };

    useEffect(() => { getTypes() }, []);

    // Handlers ----------------------------------
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'v_seatsNo' || name === 'v_vt_id') ? parseInt(value) : value;
        setVehicle({ ...vehicle, [name]: newValue });
        setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
    }

    const isValidVehicle = (vehicle) => {
        let isVehicleValid = true;
        Object.keys(vehicle).forEach((key) => {
            if (isValid[key](vehicle[key])) {
                errors[key] = null;
            } else {
                errors[key] = errorMessage[key];
                isVehicleValid = false;
            }
        });

        return isVehicleValid;
    }

    const handleCancel = () => onDismiss();
    const handleSubmit = (event) => {
        event.preventDefault();
        isValidVehicle(vehicle) && onSubmit(vehicle) && onDismiss();
        setErrors({ ...errors });
    }



    // View --------------------------------------
    return (
        <form className="BorderedForm">
            <FormItem
                label="Vehicle name"
                htmlFor="v_name"
                advice="Please enter vehicle name"
                error={errors.v_name}
            >
                <input
                    type="text"
                    name="v_name"
                    placeholder="Please enter vehicle name"
                    value={vehicle.v_name}
                    onChange={handleChange}
                />
            </FormItem>

            <FormItem
                label="Vehicle brand"
                htmlFor="v_brand"
                advice="Please enter vehicle brand"
                error={errors.v_brand}
            >
                <input
                    type="text"
                    name="v_brand"
                    placeholder="Please enter vehicle brand"
                    value={vehicle.v_brand}
                    onChange={handleChange}
                />
            </FormItem>

            <FormItem
                label="Vehicle seating number"
                htmlFor="v_seatsNo"
                advice="Please enter vehicle seating number"
                error={errors.v_seatsNo}
            >
                <input
                    type="number"
                    name="v_seatsNo"
                    placeholder="Please enter vehicle seating number"
                    value={vehicle.v_seatsNo}
                    onChange={handleChange}
                />
            </FormItem>


            <FormItem
                label="Vehicle production date"
                htmlFor="v_year"
                advice="Please enter vehicle production date"
                error={errors.v_year}

            >
                <input
                    type="date"
                    name="v_year"
                    placeholder="Please enter vehicle production date"
                    value={vehicle.v_year}
                    onChange={handleChange}
                />
            </FormItem>

            <FormItem
                label="Vehicle plate number"
                htmlFor="v_plate"
                advice="Please enter vehicle plate number"
                error={errors.v_plate}
            >
                <input
                    type="text"
                    name="v_plate"
                    placeholder="Please enter vehicle plate number "
                    value={vehicle.v_plate}
                    onChange={handleChange}
                />
            </FormItem>

            <FormItem
                label="Vehicle Image"
                htmlFor="v_imageURL"
                advice="Please enter vehicle image URL"
                error={errors.v_imageURL}
            >

                <input
                    type="text"
                    name="v_imageURL"
                    placeholder="Please enter vehicle image URL"
                    value={vehicle.v_imageURL}
                    onChange={handleChange}
                />
            </FormItem>

            <FormItem
                label="Vehicle Type"
                htmlFor="v_vt_id"
                advice="Please select vehicle type"
                error={errors.v_vt_id}
            >
                <p>Please select vehicle type</p>
                {
                    !vehicleTypes ? <p>{loadingTypesMessage}</p>
                        : vehicleTypes.length === 0
                            ? <p>No vehicle types found.</p>
                            :
                            < select
                                name="v_vt_id"
                                value={vehicle.v_vt_id}
                                onChange={handleChange}
                            >

                                <option value="0" disabled>Select vehicle type</option>
                                {
                                    vehicleTypes.map((type) => <option key={type.vt_id} value={type.vt_id}>{type.vt_name}</option>)
                                }
                            </select>
                }
            </FormItem>

            <ActionTray>
                <ActionAdd showText onClick={handleSubmit} buttonText="Save" />
                <ActionClose showText onClick={handleCancel} buttonText="Cancel" />
            </ActionTray>
        </form >

    );

}