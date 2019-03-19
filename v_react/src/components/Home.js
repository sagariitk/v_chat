import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div className="main" style= {{margin : 10}}>  
                <div className="body">
                    <h1>V Chat</h1>
                </div>
                <a href="http://vijaysantoria.xyz:9000/google-login"><button><strong style={{ fontSize: 20, padding:5 }}>Signin with Google</strong></button></a>
                <a href="http://vijaysantoria.xyz:9000/chat"><button><strong style={{ fontSize: 20, padding:5 }}>Chat App</strong></button></a>
                <a href="http://vijaysantoria.xyz:9000/logout"><button><strong style={{ fontSize: 20, padding:5 }}>Logout</strong></button></a>
            </div>
        );
    }
}
