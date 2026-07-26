import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import AdvancedMatchIntelligence from '../components/AdvancedMatchIntelligence';
import AIRelationshipCoach from '../components/AIRelationshipCoach';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import InteractiveMemberMap from '../components/InteractiveMemberMap';
import JourneyTimeline from '../components/JourneyTimeline';
import MelavaEventExperience from '../components/MelavaEventExperience';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import SocialSharingBar from '../components/SocialSharingBar';
import NotificationDrawer from '../components/NotificationDrawer';
import AICommunityChatbot from '../components/AICommunityChatbot';

const Home = () => {
  return (
    <div className="w-full overflow-hidden font-sans text-slate-800 min-h-screen relative bg-[#FCFBF9]">
      <Helmet>
        <title>Shimpi Bandhan - Premium Matrimonial Platform</title>
        <meta 
          name="description" 
          content="Premium Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities." 
        />
      </Helmet>

      {/* 1. HERO SECTION – FLOATING 3D PHOTO CLOUD */}
      <FloatingPhotoCloudHero />

      {/* 2. MEMBER SEARCH – FLOATING VISIONOS SEARCH BAR */}
      <PremiumMemberSearchBar />

      {/* 3. PREMIUM MEMBERS – APPLE-STYLE 3D COVER FLOW */}
      <PremiumMembers3DCoverFlow />

      {/* 4. AI MATCH COMPATIBILITY SCORE & EXPLANATION */}
      <AIMatchCompatibility />

      {/* 5. ADVANCED MATCH INTELLIGENCE */}
      <AdvancedMatchIntelligence />

      {/* 6. AI RELATIONSHIP & FAMILY COACH */}
      <AIRelationshipCoach />

      {/* 7. AI PROFILE STRENGTH ASSISTANT */}
      <AIProfileAssistant />

      {/* 8. SUCCESS STORIES – 3D CIRCULAR CAROUSEL */}
      <CircularSuccessStories3D />

      {/* 9. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 10. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 11. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 12. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 13. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 14. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 15. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 16. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />

      {/* 17. AI 24X7 COMMUNITY CHATBOT */}
      <AICommunityChatbot />
    </div>
  );
};

export default Home;
