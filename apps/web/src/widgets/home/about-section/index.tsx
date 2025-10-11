import Image from "next/image";
import "./style.css";
import Link from "next/link";

export const AboutSection = () => {
  return (
    <section id="about-section">
      <div className="details">
        <h2>Designing Spaces, Inspiring Connection</h2>
        <div>
          <p>
            At Hanssen, our mission is to create furniture that brings people
            together, inspired by the simplicity and warmth of Scandinavian
            design.
          </p>

          <Link href={{ href: "/about" }}>More About Us</Link>
        </div>
      </div>

      <div className="image">
        <Image
          src={"/images/about-1.jpg"}
          alt="About Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
};
