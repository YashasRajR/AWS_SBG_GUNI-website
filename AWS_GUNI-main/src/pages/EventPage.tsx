import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EVENTS } from '../data/mockData';
import { EventDetail } from './EventDetail';
import { NotFound } from './NotFound';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SonarClickEffect } from '../components/ui/SonarClickEffect';

export const EventPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen relative text-slate-100 selection:bg-[#ff9900]/30 selection:text-[#ff9900] w-full max-w-[100vw] overflow-x-hidden">
        <SonarClickEffect />
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10 w-full pt-20">
          <NotFound />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative text-slate-100 selection:bg-[#ff9900]/30 selection:text-[#ff9900] w-full max-w-[100vw] overflow-x-hidden">
      <SonarClickEffect />
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10 w-full">
        <EventDetail event={event} />
      </main>
      <Footer />
    </div>
  );
};
