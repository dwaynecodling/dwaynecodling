// posts

import Layout from "../../components/layouts/Layout";

export default function Posts(){
	return (
		<Layout title={"Latest Post"}>
			<section>

				<div className="container">
					<div className="hero__content footer__content">
						<p className="hero__subheading">What I'm Thinking</p>
						<h2 className="hero__heading">An <strong>insight</strong> into my journey</h2>
					</div>
				</div>
			</section>

			<section className="card-wrapper">
				<div className="container">
					<div className="my-posts__filter--mobile">
						<label className="my-posts__filter--label" htmlFor="track-select">View all or Events or
							Notes</label>
						<div className="my-posts__filter" data-filter-mobile="speaker_track">
							<select id="track-select" className="my-posts__select" name="field" data-ui="0"
									data-ajax="0" data-multiple="0" data-placeholder="Select" data-allow_null="0">
								<option value="all">all</option>
								<option value="events">events</option>
								<option value="notes">notes</option>
							</select>
						</div>
					</div>
					<ul className="my-posts__filter--desktop">
						<li className="my-posts__item">View All</li>
						<li className="my-posts__item">Events</li>
						<li className="my-posts__item">Notes</li>
					</ul>
					<article className="grid grid--card-list">
						<% for (let currentArticle of posts){%>
						<article class="grid__card-item">
						<a href="/post/<%= currentArticle.data.slug %>" class="card">
						<picture class="card__img-container">
						<source type="image/jpeg" data-srcset="<%= currentArticle.data.hero.lrg_jpeg %>">
						<source type="image/webp" data-srcset="<%= currentArticle.data.hero.sml_webp %>">
						<source type="image/webp" data-srcset="<%= currentArticle.data.hero.lrg_webp %>">
						<img class="card__img lazyload"
						data-src="<%= currentArticle.data.hero.main %>"
						alt="<%= currentArticle.data.alt %>"
						height="160"
						width="360"/>
						</picture>
						<div class="card__content">
						<time datetime="2020-14-06" class="card__date"><%= currentArticle.data.date %></time>
						<h3 class="card__header"><%- currentArticle.data.title %></h3>
						<p class="card__text"><%- currentArticle.data.excerpt %></p>
						</div>
						<time  datetime="PT10M" class="card__read-time">
						<%= currentArticle.data.readTime %> READ
						</time>
						</a>
						</article>
						<%} %>
						</article>
						<div className="container">
							<div className="button__align--center">
								<button className="button button--load-more">Load more</button>
							</div>
						</div>
				</div>
			</section>
		</Layout>
	)
}