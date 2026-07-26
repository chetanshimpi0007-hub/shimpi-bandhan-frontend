import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import AINaturalLanguageSearch from '../components/AINaturalLanguageSearch';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import AdvancedMatchIntelligence from '../components/AdvancedMatchIntelligence';
import AIRelationshipCoach from '../components/AIRelationshipCoach';
import CinematicProfileReveal from '../components/CinematicProfileReveal';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import CoupleMemoryTimeline from '../components/CoupleMemoryTimeline';
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
import InteractiveCommunityDashboard from '../components/InteractiveCommunityDashboard';
import SuperAdminAnalyticsWidget from '../components/SuperAdminAnalyticsWidget';
import TestimonialsStackCards from '../components/TestimonialsStackCards';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import SocialSharingBar from '../components/SocialSharingBar';
import NotificationDrawer from '../components/NotificationDrawer';
import AICommunityChatbot from '../components/AICommunityChatbot';
import VisionProProfileViewer from '../components/VisionProProfileViewer';

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - Ultra Luxury Matrimonial Experience</title>
        <meta 
          name="description" 
          content="Ultra Luxury Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities. Vision Pro profile viewer, cinematic match reveals, AI compatibility score & enterprise SaaS." 
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

      {/* 5. CINEMATIC PROFILE REVEAL EXPERIENCE */}
      <CinematicProfileReveal />

      {/* 6. AI MATCH COMPATIBILITY SCORE & EXPLANATION */}
      <AIMatchCompatibility />

      {/* 7. ADVANCED MATCH INTELLIGENCE */}
      <AdvancedMatchIntelligence />

      {/* 8. AI RELATIONSHIP & FAMILY COACH */}
      <AIRelationshipCoach />

      {/* 9. AI PROFILE STRENGTH ASSISTANT */}
      <AIProfileAssistant />

      {/* 10. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 11. COUPLE MEMORY TIMELINE */}
      <CoupleMemoryTimeline />

      {/* 12. DIGITAL WEDDING INVITATION SHOWCASE */}
      <DigitalWeddingInvitation />

      {/* 13. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 14. WEDDING PLANNER SUITE */}
      <WeddingPlannerWidget />

      {/* 15. REFERRAL & CASHBACK EARNINGS WALLET */}
      <ReferralEarningsSystem />

      {/* 16. SMART ID & DOCUMENT VERIFICATION */}
      <SmartDocumentVerification />

      {/* 17. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 18. DISTRICT & REGIONAL COORDINATOR PORTAL */}
      <DistrictCoordinatorPortal />

      {/* 19. WEDDING GALLERY – MASONRY + LIGHTBOX */}
      <WeddingGalleryMasonry />

      {/* 20. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 21. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 22. COMMUNITY SOCIAL FEED & ANNOUNCEMENTS */}
      <CommunitySocialFeed />

      {/* 23. INTERACTIVE COMMUNITY DASHBOARD */}
      <InteractiveCommunityDashboard />

      {/* 24. SUPER ADMIN ANALYTICS & REVENUE METRICS */}
      <SuperAdminAnalyticsWidget />

      {/* 25. TESTIMONIALS – STACKED CARDS */}
      <TestimonialsStackCards />

      {/* 26. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 27. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 28. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 29. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />

      {/* 30. AI 24X7 COMMUNITY CHATBOT */}
      <AICommunityChatbot />

      {/* VISION PRO PROFILE VIEWER MODAL */}
      {selectedProfile && (
        <VisionProProfileViewer profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </div>
  );
};

export default Home;
