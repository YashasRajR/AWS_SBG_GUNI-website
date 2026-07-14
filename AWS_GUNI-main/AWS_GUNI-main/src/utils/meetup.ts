import { useState, useEffect } from 'react';

export interface MeetupEvent {
  id: string;
  title: string;
  dateTime: string;
  going: number;
  venue: string;
  description: string;
  isOnline: boolean;
}

export interface MeetupData {
  memberCount: number;
  pastEvents: MeetupEvent[];
  upcomingEvents: MeetupEvent[];
  isLive: boolean;
  isLoading: boolean;
}

// Latest live numbers as of June 2026 used as static fallback
export const STATIC_FALLBACK: MeetupData = {
  memberCount: 1017,
  upcomingEvents: [
    {
      id: '315424216',
      title: 'AWS Gujarat Students Builder Week 2026',
      dateTime: '2026-07-05T21:00:00+05:30',
      going: 232,
      venue: 'Online Event (Meetup Live)',
      description: 'Get ready for AWS Gujarat Students Builder Week 2026 — a 7-day virtual learning experience organized by the AWS Student Builder Group Leaders – Gujarat.',
      isOnline: true
    }
  ],
  pastEvents: [
    {
      id: '314906294',
      title: 'GEN AI ON AWS',
      dateTime: '2026-05-25T11:30:00+05:30',
      going: 221,
      venue: 'Online Event (Meetup Live)',
      description: 'An online technical session illustrating the future of Generative AI, featuring industry use cases, building agents, and real-world tools using AWS Bedrock.',
      isOnline: true
    },
    {
      id: '313855270',
      title: 'AWS Cloud Ignite',
      dateTime: '2026-03-24T10:00:00+05:30',
      going: 675,
      venue: '209 Seminar Hall, New Building, Ganpat University, Mehsana',
      description: 'The flagship tech-ignite event at UVPCE Campus, providing students with cloud essentials, hands-on serverless labs, and career pathways in the AWS ecosystem.',
      isOnline: false
    }
  ],
  isLive: true,
  isLoading: false
};

const MEETUP_URL = 'https://www.meetup.com/aws-sbg-at-ganpat-university/';

const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`
];

export async function fetchLiveMeetupData(): Promise<MeetupData> {
  for (let i = 0; i < PROXIES.length; i++) {
    try {
      const proxyUrl = PROXIES[i](MEETUP_URL);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`Proxy response not OK: ${response.status}`);
      
      const html = await response.text();
      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (!match) throw new Error('__NEXT_DATA__ script not found in HTML');
      
      const data = JSON.parse(match[1]);
      const apolloState = data?.props?.pageProps?.__APOLLO_STATE__;
      if (!apolloState) throw new Error('__APOLLO_STATE__ not found in NEXT_DATA');
      
      const apolloKeys = Object.keys(apolloState);
      const groupKey = apolloKeys.find(k => k.startsWith('Group:'));
      if (!groupKey) throw new Error('Group key not found in Apollo State');
      
      const group = apolloState[groupKey];
      const memberCount = group?.stats?.memberCounts?.all || STATIC_FALLBACK.memberCount;
      
      const pastEvents: MeetupEvent[] = [];
      const upcomingEvents: MeetupEvent[] = [];
      apolloKeys.forEach(k => {
        if (k.startsWith('Event:')) {
          const event = apolloState[k];
          const mappedEvent = {
            id: event.id,
            title: event.title,
            dateTime: event.dateTime,
            going: event.going?.totalCount || 0,
            venue: event.venue?.name || (event.isOnline ? 'Online Event (Meetup Live)' : 'Ganpat University, Mehsana'),
            description: event.description || '',
            isOnline: !!event.isOnline
          };
          if (event.status === 'PAST') {
            pastEvents.push(mappedEvent);
          } else {
            upcomingEvents.push(mappedEvent);
          }
        }
      });
      
      // Sort past events by date descending
      pastEvents.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
      
      // Sort upcoming events by date ascending
      upcomingEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      
      // If we got events and member count, return them
      if (pastEvents.length > 0 || upcomingEvents.length > 0) {
        console.log('Successfully fetched live Meetup data from proxy', i);
        return {
          memberCount,
          pastEvents,
          upcomingEvents,
          isLive: true,
          isLoading: false
        };
      }
    } catch (err: any) {
      console.warn(`Proxy ${i} failed to fetch Meetup data:`, err.message || err);
    }
  }
  
  // Fall back to static data if all proxies fail
  console.log('Using static fallback for Meetup data');
  return {
    ...STATIC_FALLBACK,
    isLoading: false
  };
}

export function useMeetupData() {
  const [data, setData] = useState<MeetupData>({
    ...STATIC_FALLBACK,
    isLoading: true
  });

  useEffect(() => {
    let active = true;
    fetchLiveMeetupData().then(liveData => {
      if (active) {
        setData(liveData);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return data;
}
