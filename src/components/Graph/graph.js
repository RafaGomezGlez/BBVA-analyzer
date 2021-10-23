import React, { useEffect } from 'react';
var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");
// import { embedDashboard } from 'amazon-quicksight-embedding-sdk';

function Graph() {
    const dashboardRef = React.createRef();

    const embed = () => {
        const options = {
            url: "https://us-east-1.quicksight.aws.amazon.com/embed/211f1e5eb2174ba1a3be692175c39ad7/dashboards/a69101cf-58e4-4115-b17e-17432c1e7782?code=AYABeGp3O8_N7Ljpnxp-cAlgBGgAAAABAAdhd3Mta21zAEthcm46YXdzOmttczp1cy1lYXN0LTE6MjU5NDgwNDYyMTMyOmtleS81NGYwMjdiYy03MDJhLTQxY2YtYmViNS0xNDViOTExNzFkYzMAuAECAQB4ZGLViwIvMWeq0eg2SdOyWJS86qkEBfgLEiY79AhlHtMBdLXJ-WY1jHC40twei4gLzQAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHwvzDltzN219Dom9QIBEIA7dzU8zc19SCtiouuPEvjLVMLE_jCkwD3iI2xgHgGm6aUIrymWHBNIT2Fim7830tcGoSelCEN89K15UEYCAAAAAAwAABAAAAAAAAAAAAAAAAAAZeQOVd_OmvE57pF7Pso2iP____8AAAABAAAAAAAAAAAAAAABAAAAm0kWHyEIKj3Xm43rXMpfuPhPE4-_N2WGvLtmaoJBEv60IHjFKuqfLCxT6msWySP0PQL9Q9f2q27opCY6Qdj-Taef7gu0d5iLvFja4YtI7yM77K6ybjuyQZKXe8VTEChWhzexibCNI8mQDic3cqF7d8JyNPXLbCeiTzp9KFS68hg1DDdgGIzy3hxRcuSmAeQ98-H9jwiCGyKzWRnEg1nRis_MsEunQiabEgc4bA%3D%3D&identityprovider=quicksight&isauthcode=true",
            container: dashboardRef.current,
            scrolling: "yes",
            height: "700px",
            width: "1000px",
           locale: "en-US",
           footerPaddingEnabled: true
        };
       QuickSightEmbedding.embedDashboard(options)
    };

    useEffect(() => {
        embed();
    });
    return (
        <div ref={dashboardRef} />

    )
}

export default Graph
