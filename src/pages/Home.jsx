import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import AINaturalLanguageSearch from '../components/AINaturalLanguageSearch';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import VoiceVideoIntroPlayer from '../components/VoiceVideoIntroPlayer';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import DigitalWeddingInvitation from '../components/DigitalWeddingInvitation';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import WeddingPlannerWidget from '../components/WeddingPlannerWidget';
import ReferralEarningsSystem from '../components/ReferralEarningsSystem';
import SmartDocumentVerification from '../components/SmartDocumentVerification';
import InteractiveMemberMap from '../components/InteractiveMemberMap';
import WeddingGalleryMasonry from '../components/WeddingGalleryMasonry';
import JourneyTimeline from '../components/JourneyTimeline';
import MelavaEventExperience from '../components/MelavaEventExperience';
import CommunitySocialFeed from '../components/CommunitySocialFeed';
import SuperAdminAnalyticsWidget from '../components/SuperAdminAnalyticsWidget';
import TestimonialsStackCards from '../components/TestimonialsStackCards';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import SocialSharingBar from '../components/SocialSharingBar';
import NotificationDrawer from '../components/NotificationDrawer';
import AICommunityChatbot from '../components/AICommunityChatbot';

const Home = () => {
  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - Digital Community Ecosystem</title>
        <meta 
          name="description" 
          content="Enterprise Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities. AI match compatibility, document verification, wedding planner, AI chatbot & community ecosystem." 
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

      {/* 10. WEDDING PLANNER SUITE */}
      <WeddingPlannerWidget />

      {/* 11. REFERRAL & CASHBACK EARNINGS WALLET */}
      <ReferralEarningsSystem />

      {/* 12. SMART ID & DOCUMENT VERIFICATION */}
      <SmartDocumentVerification />

      {/* 13. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 14. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 15. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 16. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 17. COMMUNITY SOCIAL FEED & ANNOUNCEMENTS */}
      <CommunitySocialFeed />

      {/* 18. SUPER ADMIN ANALYTICS & REVENUE METRICS */}
      <SuperAdminAnalyticsWidget />

      {/* 19. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 20. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 21. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 22. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 23. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />

      {/* 24. AI 24X7 COMMUNITY CHATBOT */}
      <AICommunityChatbot />
    </div>
  );
};

export default Home;
