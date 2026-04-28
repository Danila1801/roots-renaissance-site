import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const About = () => {
  usePageTitle("About · ROOTS Coffeeshop");

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-10 max-w-2xl">
            <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">A coffeeshop family.</h1>
          </motion.div>

          <motion.div {...fadeInUp} className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              ROOTS runs three coffeeshops. Two in Amsterdam, one in Amersfoort. Each shop has its own setting and its own crowd.
            </p>
            <p>
              Bijlmer ArenA opened in 2017 as the first coffeeshop in Amsterdam Zuidoost. It is a walk-in retail shop under the station, no lounge, no seats.
            </p>
            <p>
              'T Keteltje is a traditional Amsterdam coffeeshop on Marnixstraat. It carries its own name and its own history. ROOTS runs it.
            </p>
            <p>
              Amersfoort is the largest of the three. Coffeeshop and full kitchen under one roof, with a sit-in space and a pool table.
            </p>
            <p>
              Different rooms, same standards. Quality cannabis, fair prices, no tobacco, valid ID at the door.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
