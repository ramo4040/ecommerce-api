import { faqData } from "./data";
import "./style.css";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
	return (
		<section id="faq-wrapper">
			<header>
				<h1>FAQ</h1>
				<p>
					Welcome to our FAQ page! Here, you’ll find answers to the most common
					questions about our products, shipping, returns, and more.
				</p>
			</header>

			<Accordion type="single" collapsible className="faq-list">
				{faqData.map((e, i) => {
					return (
						<div className="category-list" key={`category-${i}`}>
							<div className="faq-category">{e.category}</div>
							{e.faqs.map((faq, j) => (
								<AccordionItem
									key={`item-${i}-${j}`}
									value={`item-${i}-${j}`}
									className="faq-item"
								>
									<AccordionTrigger>{faq.question}</AccordionTrigger>
									<AccordionContent>{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</div>
					);
				})}
			</Accordion>
		</section>
	);
};

export default Page;
