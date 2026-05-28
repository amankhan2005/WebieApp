import { Helmet } from 'react-helmet-async';
import PageLayout from '../components/layout/PageLayout.jsx';
import Hero from '../components/sections/home/Hero.jsx';
import { ClientMarquee, ServicesGrid, WhyChooseUs } from '../components/sections/home/ServicesAndWhy.jsx';
import { FeaturedProjects } from '../components/sections/home/FeaturedProjects.jsx';
import { StatsSection, ProcessSection, IndustriesSection, AutismCTABand, FinalCTA } from '../components/sections/home/BottomSections.jsx';

const SCHEMA = {
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':['Organization','ProfessionalService'],
      '@id':'https://webieapp.com/#organization',
      name:'WebieApp Solutions LLC',
      url:'https://webieapp.com',
      description:'Premium US-registered technology and digital consultancy — bespoke websites, SaaS, digital marketing, and Autism & ABA business consulting.',
      address:{ '@type':'PostalAddress', streetAddress:'212 N. 2nd St. STE 100', addressLocality:'Richmond', addressRegion:'KY', postalCode:'40475', addressCountry:'US' },
      areaServed:'Worldwide',
      foundingDate:'2017',
    },
  ],
};

export default function Home() {
  return (
    <PageLayout>
      <Helmet>
        <title>WebieApp Solutions LLC — Premium Web Development & Autism ABA Consulting</title>
        <meta name="description" content="US-registered premium technology agency. Custom website development, SaaS platforms, digital marketing, and specialized Autism & ABA business consulting. Serving 12+ countries." />
        <link rel="canonical" href="https://webieapp.com/" />
        <meta property="og:title" content="WebieApp Solutions LLC — Premium Digital Agency" />
        <meta property="og:description" content="Premium web development, SaaS, digital marketing, and Autism & ABA consulting. US-registered. Globally trusted." />
        <meta property="og:url" content="https://webieapp.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <Hero />
      <ClientMarquee />
      <ServicesGrid />
      <WhyChooseUs />
      <StatsSection />
      <FeaturedProjects />
        <AutismCTABand />
             <IndustriesSection />

       {/* <FinalCTA /> */}
    </PageLayout>
  );
}
