//about me

import Layout from "../../components/layouts/Layout";
import Image from 'next/image'
import profilePic from '../../public/assets/img/pages/dwayne_sml.jpg'

export default function AboutMe({children}){
	return (
		<Layout title={"About Me"}>
			<section>
				<div className="container">
					<article className="about-me">
						<div className="about-me__info-snippet info-snippet">
							<div className="about-me__info-wrapper">
								<div className="about-me__info-content">
									<div className="about-me__info-content--wrapper">
										<span className="about-me__bg-text">04</span>
										<h3 className="about-me__heading">My role as a developer</h3>
										<p className="about-me__text">
											I work at JH as a frontend developer, I love what I do. I am part of the
											team that's at the forefront of making websites faster for our clients and
											their users.
										</p>
										<p className="about-me__text">
											We have produced several award-winning websites and are currently leading
											the charge of establishing Progressive Web Application (PWA) on the Magento
											Two platform.
										</p>
									</div>

									<ul className="about-me__quick-links">
										<li className="about-me__quick-link"><a href="#frontend">Front-end Developer</a>
										</li>
										<li className="about-me__quick-link"><a href="#mentor">Mentor</a></li>
										<li className="about-me__quick-link"><a href="#family">Family Man</a></li>
									</ul>
								</div>
								<div className="about-me__img--wrapper">
									<Image src={profilePic}  alt="Dwayne Codling" />
								</div>

							</div>
							<div className="about-me__details">
								<h3 id="frontend" className="about-me__heading">How did you get into being a Front-end
									Developer?</h3>

								<p className="about-me__text">
									It was when at University, doing a Multimedia course that I gravitated toward web
									design and
									development. There I learnt a little about Front-end, and over the years I’ve done
									several
									Front-end projects that I’ve always enjoyed.
								</p>

								<p className="about-me__text"> While being a Lecturer of Media at Nottingham College I
									delivered on
									several web modules to
									students. I practised by doing freelance jobs using modern best practice, all so
									that I was
									confident in teaching the students real-time knowledge that’d set them up best for
									getting jobs
									out there.
								</p>

								<h3 className="about-me__heading"> What made you make the switch from college to agency
									life? </h3>

								<p className="about-me__text"> Lecturing was great for me, it gave me time to develop my
									skills, I made
									some lifelong friends,
									and was able to start a small web design development practice with a couple of my
									colleagues.
								</p>

								<p className="about-me__text"> But, I felt it was the right time to make a change: My
									personal life had
									taken some fairly
									exciting turns – in that time I’d become engaged, and my partner and I had our
									second child. In
									honesty, I wanted to be more, and do more, for my family.
								</p>

								<p className="about-me__text"> Lecturing felt like a hard slog sometimes. Being able to
									inspire young
									people was amazing,
									something I’ll always feel passionate about. But obviously, that’s sometimes hard to
									do as a
									lecturer. When we had designers from JH in to speak– the students were so inspired,
									without
									exaggerating, for some of them it was pretty life-changing.
								</p>

								<p className="about-me__text"> Now I’m working here I feel I’ll be able to do more for
									the young people
									wanting to enter this
									industry. It gives me a unique perspective on seeing it from both sides: both
									lecturing and
									working in an agency. I would really like to help to bridge the gap of what is
									expected from
									students leaving education wanting to enter into a role like this. I’d really like
									to help JH
									extend further into helping students get into the industry – there's definitely
									plenty of
									opportunities to do so here.
								</p>

								<h3 className="about-me__heading">
									What drew you to JH as a place to work?
								</h3>

								<p className="about-me__text"> JH is quite different from other agencies. Its commitment
									to the
									community, seen by DXN, the event it runs, the support it gives to universities and
									colleges,
									and a whole lot more – for me, that really sets it apart. Like so many in
									Nottingham, I’ve
									always seen it as being somewhere I’d love to work sometime.
								</p>

								<p className="about-me__text"> I’d been thinking about moving into full-time web
									development recently
									after learning so much: I
									knew I was now skilled enough and felt confident in my ability to learn more, so
									there was
									nothing stopping me going for it.
								</p>

								<p className="about-me__text"> I just needed to find a company that was aligned to my
									career
									progression, attitude towards
									education – with creative, fun, and highly skilled people to be around, luckily JH
									was hiring.

								</p>
								<h3 className="about-me__heading">How are you finding it here so far?</h3>

								<p className="about-me__text"> I feel very welcome and everyone has really gone above
									and beyond to make
									sure that I’m comfortable. Being the new kid in the office is strange, as I feel
									like I’m an old
									face here, having met so many of the team, and have worked with a fair few too –
									I’ve hot-desked
									here for my own work plenty of times too.
								</p>

								<p className="about-me__text"> Now my hunger to learn more is what's driving me, I
									realise that there
									are so many more levels
									to where I want to go, and in order to get there I need to learn from the best: Some
									of the best
									people in the industry work here.
								</p>

								<h3 className="about-me__heading"> Have you got any advice for anyone looking for a
									career in Design /
									Development?
								</h3>

								<p className="about-me__text"> Personally, I think attending the brilliant meet-ups we
									have in
									Nottingham for the community is
									a really great start. JH’s DXN on the second Wednesday of every month, in
									Nottingham’s Creative
									Quarter, and it’s a brilliant way to find out more and meet people in the industry.
								</p>

								<p className="about-me__text"> In fact, it was December 2016 at DXN that change my
									mindset completely,
									it was a talk from designer
									Gareth Strange, it was called “change is good”. That hit a chord, and I felt like he
									was talking
									directly to me. After that, I decided to give it my all, applying for a Front-end
									Developer job
									they were advertising for at the time.
								</p>

								<p className="about-me__text"> Just remember life is short, if you want to be in the
									industry, be in the
									industry – go to the
									events, put in the groundwork, so that you’re ready when the opportunity comes.
								</p>
							</div>
						</div>
					</article>
				</div>
			</section>
		</Layout>
	)
}