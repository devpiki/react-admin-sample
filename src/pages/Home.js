import React from "react";
import HomeImg from '../images/logo.svg';

const Home = (() => {

    React.useEffect(() => {
        const hImg = document.getElementById('homeImg');
        hImg.src = HomeImg;
    }, []);

    return (
        <div id="container" style={{width: '80%', marginLeft: '10%'}}>
            <img id="homeImg" style={{
                marginTop: '7px', width: '70%', marginLeft: '15%'
            }}/>
        </div>
    );

});

export default Home;
