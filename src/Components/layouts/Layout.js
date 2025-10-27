import Header from './Header.js';

function Layout(props) {
    // Properties
    //Hooks
    //Context
    //Methods
    //View
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;