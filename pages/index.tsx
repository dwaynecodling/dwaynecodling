 // homepage

import Layout from "../components/layouts/Layout";

 export default function Index(){
	return (
		<Layout title={"Dwayne Codling"}>
			<section>
				<div className="container">
					<div className="hero">
						<div className="hero__content">
							<p className="hero__subheading">My journey</p>
							<h1 className="hero__heading">Hi! I’m <strong>Dwayne</strong>, a pod lead and front-end
								developer at <a className="hero__link" href="https:wearejh.com" target="_blank"
												rel="noopener">JH</a>.
							</h1>
							<a href="/about-me" className="hero__button">
                            <span className="hero__button-content">
                                <span className="hero__button-text">More about me</span>
                                <svg className="hero__button-arrow" width="18" height="14"
									 xmlns="http://www.w3.org/2000/svg"><g transform="rotate(90 8 9)" fill="none"><rect
									fill="#FFF" x="5" y="1" width="2" height="16" rx="1"/><path stroke="#FFF"
																								stroke-width="2"
																								stroke-linecap="round"
																								stroke-linejoin="round"
																								d="M12 6L6 0 0 6"/></g></svg>
                            </span>
							</a>
						</div>
						<a className="hero__down-arrow" href="#section1"
						   aria-label="Link will scroll quickly to the first section">
							<svg width="14" height="22" xmlns="http://www.w3.org/2000/svg">
								<g fill-rule="nonzero" fill="none">
									<path fill="#000" d="M-833-787H847v2448H-833z"/>
									<g transform="translate(-23 -20)">
										<g transform="matrix(1 0 0 -1 24 41)">
											<rect fill="#FFF" x="5" y="1" width="2" height="20" rx="1"/>
											<path stroke="#FFF" stroke-width="2" stroke-linecap="round"
												  stroke-linejoin="round"
												  d="M12 6L6 0 0 6"/>
										</g>
										<circle stroke="#666" stroke-width="2" cx="30" cy="30" r="29"/>
									</g>
								</g>
							</svg>
						</a>
					</div>
				</div>
			</section>

			<section id="section1">
				<div className="container">
					<article className="grid grid--list-of-3">
						<article className="grid__info">
							<div className="info-snippet">
								<span className="info-snippet__bg-text">01</span>
								<h3 className="info-snippet__heading">Former lecturer</h3>
								<p className="info-snippet__text">I enjoy helping people out and seeing them progress to
									their
									full
									potential.</p>
							</div>
						</article>
						<article className="grid__info">
							<div className="info-snippet">
								<span className="info-snippet__bg-text">02</span>
								<h3 className="info-snippet__heading">Family man</h3>
								<p className="info-snippet__text">I believe that life is all about balance, and that
									family is
									the
									most important thing.</p>
							</div>
						</article>
						<article className="grid__info">
							<div className="info-snippet">
								<span className="info-snippet__bg-text">03</span>
								<h3 className="info-snippet__heading">Always learning</h3>
								<p className="info-snippet__text">Learning is part of the journey, and I’m always
									seeking to
									find
									new answers.</p>
							</div>
						</article>
					</article>
				</div>
			</section>
		</Layout>
	)
}