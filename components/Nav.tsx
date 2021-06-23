import Link from "next/link"

export default function Nav(){
	return (
		<nav className="navigation">
			<div className="container navigation__container">
				<a className="navigation__logo" href="/">DwayneCodling.</a>
				<ul className="navigation__links">
					<li className="navigation__link"><Link href={"/about-me"}>About Me</Link></li>
					<li className="navigation__link"><Link href={"/app/postsosts"}>My posts</Link></li>
					<li className="navigation__link link--alt"><Link href={"/contact-me"}>Contact</Link></li>
				</ul>
			</div>
		</nav>
	)
}