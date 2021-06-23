
import "/public/assets/css/style.min.css"

import {AppProps} from "next/app"

export default function App({Component, pageProps}:AppProps){
	return <Component {...pageProps}/>
}