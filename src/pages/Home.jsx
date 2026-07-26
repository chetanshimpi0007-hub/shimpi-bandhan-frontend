import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import WeddingGalleryMasonry from '../components/WeddingGalleryMasonry';
import JourneyTimeline from '../components/JourneyTimeline';
import TestimonialsStackCards from '../components/TestimonialsStackCards';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';

const Home = () => {
  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - Premium Matrimonial Platform</title>
        <meta 
          name="description" 
          content="Find your perfect life partner within Aher Shimpi & Namdev Shimpi communities. 3D profile clouds, verified members, business directory & success stories." 
        />
      </Helmet>

      {/* 1. HERO SECTION – FLOATING 3D PHOTO CLOUD */}
      <FloatingPhotoCloudHero />

      {/* 2. PREMIUM MEMBERS – APPLE-STYLE 3D COVER FLOW */}
      <PremiumMembers3DCoverFlow />

      {/* 3. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 4. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 5. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 6. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 7. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 8. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 9. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />
    </div>
  );
};

export default Home;
