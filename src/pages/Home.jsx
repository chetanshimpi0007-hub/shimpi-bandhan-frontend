import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import AINaturalLanguageSearch from '../components/AINaturalLanguageSearch';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import DigitalWeddingInvitation from '../components/DigitalWeddingInvitation';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import InteractiveMemberMap from '../components/InteractiveMemberMap';
import WeddingGalleryMasonry from '../components/WeddingGalleryMasonry';
import JourneyTimeline from '../components/JourneyTimeline';
import MelavaEventExperience from '../components/MelavaEventExperience';
import CommunitySocialFeed from '../components/CommunitySocialFeed';
import ReferralEarningsSystem from '../components/ReferralEarningsSystem';
import SmartDocumentVerification from '../components/SmartDocumentVerification';
import SuperAdminAnalyticsWidget from '../components/SuperAdminAnalyticsWidget';
import TestimonialsStackCards from '../components/TestimonialsStackCards';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import SocialSharingBar from '../components/SocialSharingBar';
import NotificationDrawer from '../components/NotificationDrawer';

const Home = () => {
  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - Enterprise SaaS Matrimonial Platform</title>
        <meta 
          name="description" 
          content="Enterprise SaaS Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities. AI match compatibility, document verification, referral wallet & business directory." 
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

      {/* 5. AI MATCH COMPATIBILITY SCORE & EXPLANATION */}
      <AIMatchCompatibility />

      {/* 6. AI PROFILE STRENGTH ASSISTANT */}
      <AIProfileAssistant />

      {/* 7. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 8. DIGITAL WEDDING INVITATION SHOWCASE */}
      <DigitalWeddingInvitation />

      {/* 9. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 10. REFERRAL & CASHBACK EARNINGS WALLET */}
      <ReferralEarningsSystem />

      {/* 11. SMART ID & DOCUMENT VERIFICATION */}
      <SmartDocumentVerification />

      {/* 12. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 13. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 14. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 15. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 16. COMMUNITY SOCIAL FEED & ANNOUNCEMENTS */}
      <CommunitySocialFeed />

      {/* 17. SUPER ADMIN ANALYTICS & REVENUE METRICS */}
      <SuperAdminAnalyticsWidget />

      {/* 18. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 19. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 20. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 21. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 22. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />
    </div>
  );
};

export default Home;
