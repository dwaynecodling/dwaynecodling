import Head from "next/head";
import Nav from "../Nav";
import Footer from "../Footer";
import ImportLinks from "../ImportLinks";

export default function Layout({children, title}){
	return (
		<div>
			<Head>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
				<meta name="Description" content="Dwayne Codling role as a frontend developer."/>
				<title>{title}</title>
				<meta name="twitter:card" content="summary"/>
				<meta name="twitter:creator" content="@codling"/>
				<meta property="og:title" content="Dwayne Codling"/>
				<meta property="og:description" content="Dwayne Codling role as a frontend developer."/>
				<meta property="og:image" content="https://dwaynecodling.com/assets/img/dwayne_sml.jpg"/>
				<ImportLinks/>
			</Head>

			<Nav/>

			<main className="content" role="main">
				{children}
			</main>

			<Footer/>
		</div>
	)
}