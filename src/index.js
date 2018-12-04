import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


/* Function based component
const App = () => {
// you need class based components to display the latitude
    return <div>Latitude: </div>;
};
*/


// Class Based Component
// React expects our component to have many methods attached to it when class based
class App extends React.Component {
    //we refactored the constructor, this is more concise
    state = { lat: null, errorMessage: '' };

    //Lifecycle Methods
    componentDidMount() {
        //moved this call from Render to Constructor because you don't want to put calls in Render (gets called too much)
        window.navigator.geolocation.getCurrentPosition(
            //removed console.log to UPDATE State function- must use SetState
            position => this.setState({ lat: position.coords.latitude }),
            //the Failure Callback
            err => this.setState({ errorMessage: err.message })
            //we CALLED setState
            // this callback runs at a point and time in the future            
            // NEVER DO: this.state.lat = position.coords.latitude (direct assignment)
        );
    }

    componentDidUpdate() {
        console.log('My component was just updated- it rerendered');
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage} </div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message="Please Accept Location Request" />;
    }

    // Render method is REQUIRED for every component we create, React says we must define render- or you error
    //Conditional Rendering
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.querySelector('#root'));