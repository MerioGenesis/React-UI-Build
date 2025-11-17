import './Form.scss';

export default function FormItem({ label, htmlFor, advice, error, children }) {
    //Properties ------------------------------------   
    //Hooks -----------------------------------------
    //Context ---------------------------------------
    //Methods ---------------------------------------
    //View ------------------------------------------
    return (
        <div className="FormItem">
            <label className="FormLabel" htmlFor="v_name">{label}</label>
            {
                advice && <p className="FormAdvice">{advice}</p>
            }
            {
                children
            }
            {
                error && <p className="FormError">{error}</p>
            }
        </div>
    );
}