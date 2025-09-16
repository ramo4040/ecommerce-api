import { Marquee } from "@/widgets";
import "./style.css";

const Page = () => {
	return (
		<div id="about-page">
			<section className="company-presentation content-wrapper">
				<h1>Things to Look for When Comparing Branding Alternatives</h1>
				<p>
					Scandinavian design emphasizes simplicity, natural light, and clean
					lines. Explore how this minimalist style can transform your home into
					a calming, functional space that’s both stylish and inviting.
				</p>
			</section>

			<section>
				<Marquee className="company-marquee">
					<div className="marquee-content">
						<div className="marquee-item" />
						<div className="marquee-item" />
						<div className="marquee-item" />
						<div className="marquee-item" />
						<div className="marquee-item" />
						<div className="marquee-item" />
					</div>
				</Marquee>
			</section>

			<section className="section-title">Our Mission</section>

			<section className="our-mission content-wrapper">
				<h1>The Liberating Power of Minimalism</h1>
				<p>
					Decluttering begins with the act of letting go. It's about freeing
					ourselves from the weight of excess possessions that no longer serve
					us. By evaluating each item and asking ourselves whether it brings us
					joy or serves a practical purpose, we can make mindful decisions about
					what to keep and what to release. Letting go of the unnecessary allows
					us to create a physical and mental space that promotes clarity and
					tranquility.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
					facilisis lorem quis pretium posuere. Nam gravida orci in massa
					convallis vestibulum. Sed venenatis hendrerit gravida. In nec lectus
					diam. Sed tellus justo, aliquam id eros sit amet, condimentum
					ullamcorper justo. In lacinia, purus ut congue pharetra, elit sapien
					aliquam turpis, non viverra dui ante id orci. Nam laoreet ornare urna,
					in varius nibh finibus sit amet. Quisque sed.
				</p>
			</section>
		</div>
	);
};

export default Page;
