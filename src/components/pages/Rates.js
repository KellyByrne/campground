import React from 'react';

class Rates extends React.Component {
    render() {
        return (
            <div>
                <h1>Rates</h1>
                <h3>RV Sites</h3>
                Sun - Wednesday
                    1 AC: 50
                    2 ACs: 60
                    3+ ACs: 70

                Thursday, Friday, Saturday
                    1 AC: 60
                    2 ACs: 70
                    3+ ACs: 80

                <h3>Tent Sites</h3>
                $30/night
            </div>
        );
    };
}

export default Rates;