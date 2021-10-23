import React from 'react'
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';

function graph() {

    var dashboard = null;
    function onError(payload) {
        console.log("Do something when the dashboard fails loading");
    };
    function onDashboardLoad(payload) {
        console.log("Do something when the dashboard is fully loaded.");
    };

    function embedDashboardTest() {
        var containerDiv = document.getElementById("dashboardContainer");
        var options = {
            url: "https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/a69101cf-58e4-4115-b17e-17432c1e7782",
            container: containerDiv,
            parameters: {   
                
            },
            scrolling: "no",
            height: "700px",
            width: "1000px"
        };
        dashboard = embedDashboard(options);
        dashboard.on('error', onError);
        dashboard.on('load', onDashboardLoad);
    }

    // const showDashboard = () =>{
    //     const containerDiv = document.getElementById("embeddingContainer");
    //     const options = {
    //         // replace this dummy url with the one generated via embedding API
    //         url: "https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/7b012504-97fb-461f-bb24-b4fd0202cfd6/views/95a89943-970f-47f5-a5d5-1b6da4a8aa48",  
    //         container: containerDiv,
    //         scrolling: "no",
    //         height: "700px",
    //         width: "1000px",
    //         footerPaddingEnabled: true
    //     };
    //     const dashboard = embedDashboard(options);
    //     return dashboard;
    // };
    

    return (
            <body onLoad={embedDashboardTest()}>
                <div id="embeddingContainer"></div>
            </body>
    )
}

export default graph
