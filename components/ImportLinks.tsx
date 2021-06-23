import Script from "next/script"
import {useEffect} from "react";

export default function ImportLinks(){
    useEffect(()=>{
        var dataLayer = dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        // @ts-ignore
        gtag('js', new Date());
        // @ts-ignore
        gtag('config', 'UA-88200528-2');
    }, []);

    return (
        <>
            <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/assets/img/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/assets/img/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />

            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-88200528-2"/>
        </>
    )
}
