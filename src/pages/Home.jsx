import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingPhotoCloudHero from '../components/FloatingPhotoCloudHero';
import PremiumMemberSearchBar from '../components/PremiumMemberSearchBar';
import PremiumMembers3DCoverFlow from '../components/PremiumMembers3DCoverFlow';
import AIMatchCompatibility from '../components/AIMatchCompatibility';
import AIProfileAssistant from '../components/AIProfileAssistant';
import AdvancedMatchIntelligence from '../components/AdvancedMatchIntelligence';
import AIRelationshipCoach from '../components/AIRelationshipCoach';
import CinematicProfileReveal from '../components/CinematicProfileReveal';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import CoupleMemoryTimeline from '../components/CoupleMemoryTimeline';
import BusinessDirectory3DCoverFlow from '../components/BusinessDirectory3DCoverFlow';
import InteractiveMemberMap from '../components/InteractiveMemberMap';
import JourneyTimeline from '../components/JourneyTimeline';
import MelavaEventExperience from '../components/MelavaEventExperience';
import PremiumStatsCounters from '../components/PremiumStatsCounters';
import ParallaxCTASection from '../components/ParallaxCTASection';
import SocialSharingBar from '../components/SocialSharingBar';
import NotificationDrawer from '../components/NotificationDrawer';
import AICommunityChatbot from '../components/AICommunityChatbot';
import VisionProProfileViewer from '../components/VisionProProfileViewer';

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="w-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative w-full">
      <Helmet>
        <title>Shimpi Bandhan - Matrimonial Platform</title>
        <meta 
          name="description" 
          content="Matrimonial Platform for Aher Shimpi & Namdev Shimpi communities." 
        />
      </Helmet>

      {/* 1. HERO SECTION – FLOATING 3D PHOTO CLOUD */}
      <FloatingPhotoCloudHero />

      {/* 2. MEMBER SEARCH – FLOATING VISIONOS SEARCH BAR */}
      <PremiumMemberSearchBar />

      {/* 3. PREMIUM MEMBERS – APPLE-STYLE 3D COVER FLOW */}
      <PremiumMembers3DCoverFlow />

      {/* 4. CINEMATIC PROFILE REVEAL EXPERIENCE */}
      <CinematicProfileReveal />

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

      {/* 10. COUPLE MEMORY TIMELINE */}
      <CoupleMemoryTimeline />

      {/* 11. BUSINESS DIRECTORY – 3D COVER FLOW */}
      <BusinessDirectory3DCoverFlow />

      {/* 12. INTERACTIVE MEMBER MAP BY CITY */}
      <InteractiveMemberMap />

      {/* 13. JOURNEY SECTION – ANIMATED 9-STEP TIMELINE */}
      <JourneyTimeline />

      {/* 14. COMMUNITY MELAVA EVENTS SHOWCASE */}
      <MelavaEventExperience />

      {/* 15. STATISTICS – PREMIUM COUNTERS */}
      <PremiumStatsCounters />

      {/* 16. CALL TO ACTION – MULTI-LAYER PARALLAX */}
      <ParallaxCTASection />

      {/* 17. SOCIAL SHARING BAR */}
      <SocialSharingBar />

      {/* 18. GLASS NOTIFICATION DRAWER */}
      <NotificationDrawer />

      {/* 19. AI 24X7 COMMUNITY CHATBOT */}
      <AICommunityChatbot />

      {/* VISION PRO PROFILE VIEWER MODAL */}
      {selectedProfile && (
        <VisionProProfileViewer profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </div>
  );
};

export default Home;
