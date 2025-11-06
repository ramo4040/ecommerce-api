import { Armchair, Car, Globe, Package } from "lucide-react";
import { useCategories } from "@/entities/categories/api";
import { getAllProducts } from "@/entities/product";
import {
  AboutSection,
  Footer,
  HeroNavbars,
  HeroSlider,
  HomeProductsSlider,
  HomeSections,
  Marquee,
  SocialLinks,
} from "@/widgets";

export default async function Home() {
  const [categories, featuredProducts] = await Promise.all([
    useCategories(),
    getAllProducts({
      page: 1,
      is_featured: 1,
    }),
  ]);

  return (
    <main id="home-page">
      <section id="hero-section">
        <Marquee>
          <p>
            This is an announcement! - This is an announcement! -This is an
            announcement! -This is an announcement!
          </p>
        </Marquee>
        <HeroSlider>
          <HeroNavbars />
        </HeroSlider>
      </section>

      <section id="features-section">
        <div className="feature">
          <Car /> <h4>Free Shipping over 500€</h4>
        </div>
        <div className="feature">
          <Globe /> <h4>Worldwide Shipping</h4>
        </div>
        <div className="feature">
          <Package /> <h4>Free Returns</h4>
        </div>
        <div className="feature">
          <Armchair /> <h4>5-Year Warranty</h4>
        </div>
      </section>

      <section className="home-page-separator">
        <h2>Our Favorites</h2>
      </section>

      {featuredProducts.data && (
        <HomeProductsSlider products={featuredProducts.data?.data} />
      )}

      <section className="home-page-separator">
        <h2>Collections</h2>
      </section>

      <HomeSections data={categories.data} />

      <section className="home-page-separator">
        <h2>About Us</h2>
      </section>

      <AboutSection />

      <SocialLinks />

      <Footer />
    </main>
  );
}
