import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import AINaturalLanguageSearch from '../components/AINaturalLanguageSearch';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import AdvancedMatchIntelligence from '../components/AdvancedMatchIntelligence';
import AIRelationshipCoach from '../components/AIRelationshipCoach';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import DigitalWeddingInvitation from '../components/DigitalWeddingInvitation';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import WeddingPlannerWidget from '../components/WeddingPlannerWidget';
import ReferralEarningsSystem from '../components/ReferralEarningsSystem';
import SmartDocumentVerification from '../components/SmartDocumentVerification';
import InteractiveMemberMap from '../components/InteractiveMemberMap';
import DistrictCoordinatorPortal from '../components/DistrictCoordinatorPortal';
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
        <title>Shimpi Bandhan - Global Enterprise Community Platform</title>
        <meta 
          name="description" 
          content="Global Enterprise Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities. AI match compatibility, document verification, relationship coaching, coordinator portal & community ecosystem." 
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

      {/* 6. ADVANCED MATCH INTELLIGENCE */}
      <AdvancedMatchIntelligence />

      {/* 7. AI RELATIONSHIP & FAMILY COACH */}
      <AIRelationshipCoach />

      {/* 8. AI PROFILE STRENGTH ASSISTANT */}
      <AIProfileAssistant />

      {/* 9. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 10. DIGITAL WEDDING INVITATION SHOWCASE */}
      <DigitalWeddingInvitation />

      {/* 11. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 12. WEDDING PLANNER SUITE */}
      <WeddingPlannerWidget />

      {/* 13. REFERRAL & CASHBACK EARNINGS WALLET */}
      <ReferralEarningsSystem />

      {/* 14. SMART ID & DOCUMENT VERIFICATION */}
      <SmartDocumentVerification />

      {/* 15. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 16. DISTRICT & REGIONAL COORDINATOR PORTAL */}
      <DistrictCoordinatorPortal />

      {/* 17. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 18. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 19. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 20. COMMUNITY SOCIAL FEED & ANNOUNCEMENTS */}
      <CommunitySocialFeed />

      {/* 21. SUPER ADMIN ANALYTICS & REVENUE METRICS */}
      <SuperAdminAnalyticsWidget />

      {/* 22. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 23. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 24. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 25. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 26. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />

      {/* 27. AI 24X7 COMMUNITY CHATBOT */}
      <AICommunityChatbot />
    </div>
  );
};

export default Home;
