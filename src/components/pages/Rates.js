import React from 'react';

class Rates extends React.Component {
    render() {
        return (
            <div className="circle-icon">
                 <div className="outer">
                    <div className="inner rotate">
                        <h1>Rates</h1>
                        <div className="blue-highlight"></div>
                    </div>
                </div>
                <div style={{paddingTop:'40px'}} class="col-lg-12">
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

            </div>
        );
    };
}

export default Rates;