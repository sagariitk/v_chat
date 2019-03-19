import React from 'react';

export default class Error extends React.Component {

    render() {
        return (
            <div className="main" style= {{margin : 10}}>  
                <div className="body">
                    <h1>Error in loading page</h1>
                </div>
                <a href="http://vijaysantoria.xyz:3000"><button><strong style={{ fontSize: 20, padding:5 }}>V Chat</strong></button></a>
            </div>
        );
    }
}