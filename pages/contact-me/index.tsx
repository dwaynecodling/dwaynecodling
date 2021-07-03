//contact me

import Layout from "../../components/layouts/Layout";
import Image from 'next/image'
import mapPic from '../../public/assets/img/pages/map.jpg'

export default function ContactMe(){
	return (
		<Layout title={"Contact Me"}>
			<section>
				<div className="container">
					<div className="contact-form">
						<div className="contact-form__img-wrapper">
							<Image className="contact-form__img lazyload" src={mapPic} alt="Office Map"/>
						</div>
						<div className="contact-form__content-wrapper">
							<div className="contact-form__content">
								<span className="info-snippet__bg-text">05</span>
								<h3 className="contact-form__title">You can also find me WFH in the outdoor office
									(shed).</h3>
								<p className="contact-form__text">I aim to respond as quickly as possible, and if you
									need any help, why not arrange a day during the week for me to meet up with you on
									Zoom?</p>
							</div>

							<form id="contactForm" action="/form/contact" method="post" className="contact-form__form">
								<fieldset>
									<div id="field-name-field" className="contact-form__name-field">
										<label htmlFor="name-field" className="contact-form__label">What is your
											name?</label>
									</div>
									<div className="contact-form__control">
										<input name="name" type="text" className="contact-form__input" id="name-field"
											   placeholder="Your name"/>
									</div>
									<div id="field-email-field" className="contact-form__name-field">
										<label htmlFor="email-field" className="contact-form__label">What is your
											email?</label>
									</div>
									<div className="contact-form__control">
										<input name="email" type="email" className="contact-form__input"
											   id="email-field" placeholder="Your email"/>
									</div>
									<div id="field-textarea" className="contact-form__textarea">
										<label htmlFor="textarea" className="contact-form__label">How can I
											help?</label>
									</div>
									<div className="contact-form__control">
                    <textarea
						name="message"
						className="contact-form__textarea-input"
						id="textarea"
						placeholder="Your message"
					></textarea>
									</div>
									<button className="contact-form__button">
                    <span className="hero__button-content">
                        <span className="hero__button-text">Send message</span>
                        <svg className="hero__button-arrow" width="18" height="14"
							 xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(90 8 9)" fill="none">
                                <rect fill="#FFF" x="5" y="1" width="2" height="16" rx="1"/>
                                <path stroke="#FFF"
									  stroke-width="2"
									  stroke-linecap="round"
									  stroke-linejoin="round"
									  d="M12 6L6 0 0 6"/></g></svg>
                    </span>
									</button>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</section>

		</Layout>
	)
}