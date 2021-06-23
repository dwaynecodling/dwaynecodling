
export default function CTA(){
	return (
		<div className="container">

			<div className="footer__top">
				<div className="hero__content footer__content">
					<p className="hero__subheading">got a question?</p>
					<h2 className="hero__heading">I’m always <strong>happy</strong> to help.</h2>
					<a href="/contact-me" className="hero__button">
                        <span className="hero__button-content">
                            <span className="hero__button-text">Get in touch</span>
                            <svg className="hero__button-arrow" width="18" height="14"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g transform="rotate(90 8 9)" fill="none">
                                    <rect fill="#FFF" x="5" y="1" width="2" height="16" rx="1"/>
                                    <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6L6 0 0 6"/>
                                </g>
                            </svg>
                        </span>
					</a>
				</div>
			</div>

		</div>
	)
}