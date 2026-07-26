import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import AINaturalLanguageSearch from '../components/AINaturalLanguageSearch';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import DigitalWeddingInvitation from '../components/DigitalWeddingInvitation';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import WeddingGalleryMasonry from '../components/WeddingGalleryMasonry';
import JourneyTimeline from '../components/JourneyTimeline';
import MelavaEventExperience from '../components/MelavaEventExperience';
import TestimonialsStackCards from '../components/TestimonialsStackCards';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import NotificationDrawer from '../components/NotificationDrawer';

const Home = () => {
  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - Ultra Premium Matrimonial Platform</title>
        <meta 
          name="description" 
          content="Aher Shimpi & Namdev Shimpi Matrimonial Platform with AI match compatibility, 3D cover flow, business directory, wedding gallery and digital invitations." 
        />
      </Helmet>

      {/* 1. HERO SECTION – FLOATING 3D PHOTO CLOUD */}
      <FloatingPhotoCloudHero />

      {/* 2. AI NATURAL LANGUAGE SEARCH */}
      <AINaturalLanguageSearch />

      {/* 3. MEMBER SEARCH – FLOATING VISIONOS SEARCH BAR */}
      <PremiumMemberSearchBar />

      {/* 4. PREMIUM MEMBERS – APPLE-STYLE 3D COVER FLOW */}
      <PremiumMembers3DCoverFlow />

      {/* 5. AI MATCH COMPATIBILITY SCORE */}
      <AIMatchCompatibility />

      {/* 6. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 7. DIGITAL WEDDING INVITATION SHOWCASE */}
      <DigitalWeddingInvitation />

      {/* 8. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 9. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 10. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 11. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 12. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 13. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 14. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 15. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />
    </div>
  );
};

export default Home;
