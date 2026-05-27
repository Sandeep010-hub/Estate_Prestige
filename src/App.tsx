import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustStats from './components/TrustStats';
import FeaturedProperties from './components/FeaturedProperties';
import ValueProps from './components/ValueProps';
import ConstructionTeaser from './components/ConstructionTeaser';
import PropertiesPage from './components/PropertiesPage';
import DetailsPage from './components/DetailsPage';
import ContactPage from './components/ContactPage';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';
import VisualizerDrawer from './components/VisualizerDrawer';
import WhatsAppAdvisory from './components/WhatsAppAdvisory';

import { properties } from './data';
import { Property, Plot } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'properties' | 'details' | 'contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property>(properties[0]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  // Smooth slide positioning helpers on tab transitions
  const handleTabChange = (tab: 'home' | 'properties' | 'details' | 'contact') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // When clicking on a featured property card
  const handlePropertySelection = (propertyId: string) => {
    const matched = properties.find((p) => p.id === propertyId);
    if (matched) {
      setSelectedProperty(matched);
      // Reset selected plot to null to let Details page auto-select the first available one
      setSelectedPlot(null);
      handleTabChange('details');
    }
  };

  // Callback requesting from standard forms
  const handleEnquirySubmit = (data: any) => {
    console.log('Premium Enquiry Logged:', data);
  };

  return (
    <div className="bg-[#0e1322] min-h-screen text-white font-sans selection:bg-[#ffc02c]/30 selection:text-white" id="main-application-frame">
      {/* 1. Brand Navbar */}
      <Header 
        currentTab={currentTab} 
        onTabChange={handleTabChange}
        onEnquireClick={() => handleTabChange('contact')}
      />

      {/* 2. Page Content Render Blocks */}
      <div>
        {currentTab === 'home' && (
          <div className="fade-up" id="home-view-container">
            <HeroSection onExploreClick={() => handleTabChange('properties')} />
            <TrustStats />
            <FeaturedProperties 
              properties={properties} 
              onPropertyClick={handlePropertySelection} 
              onViewAllClick={() => handleTabChange('properties')}
            />
            <ValueProps />
            <ConstructionTeaser onContactClick={() => handleTabChange('contact')} />
            <BottomCTA />
          </div>
        )}

        {currentTab === 'properties' && (
          <div className="fade-up" id="properties-view-container">
            <PropertiesPage 
              properties={properties} 
              onPropertyClick={handlePropertySelection} 
            />
            <BottomCTA />
          </div>
        )}

        {currentTab === 'details' && (
          <div className="fade-up" id="details-view-container">
            <DetailsPage 
              property={selectedProperty} 
              onPlotSelect={(plot) => {
                setSelectedPlot(plot);
                setIsBlueprintOpen(true);
              }}
              onEnquirePlot={(plot) => {
                setSelectedPlot(plot);
                handleTabChange('contact');
              }}
            />
            <BottomCTA />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="fade-up" id="contact-view-container">
            <ContactPage 
              selectedProperty={selectedProperty}
              selectedPlot={selectedPlot || undefined}
              onSubmitInquiry={handleEnquirySubmit}
            />
          </div>
        )}
      </div>

      {/* 3. Global Aesthetic Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* 4. Interactive Vector Blueprint Drawer */}
      <VisualizerDrawer 
        plot={selectedPlot}
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
        onEnquire={(plot) => {
          setIsBlueprintOpen(false);
          handleTabChange('contact');
        }}
      />

      {/* 5. Custom WhatsApp Interactive FAB */}
      <WhatsAppAdvisory />
    </div>
  );
}
