import { Input } from "@/components/ui/input";
import "./style.css";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  return (
    <div id="contact-details">
      <form>
        <h1>Let's Talk</h1>

        <div className="inputs-group">
          <Input placeholder="Name" name="name" />
          <Input placeholder="Email" name="email" />
        </div>

        <Textarea placeholder="Message" name="message" />

        <Button type="submit">Send Message</Button>
      </form>
      <section className="location-cards">
        <div>
          <h1>Prague</h1>
          <p>
            Vinohradská 121, <br /> 130 00 Praha 3, <br /> Czech Republic
          </p>
          <Link
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ItemFlipWrapper className="button-wrapper">
              <Button type="button">
                Get Directions
                <ItemFlipAnimation text={<ArrowUpRight />} />
              </Button>
            </ItemFlipWrapper>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
