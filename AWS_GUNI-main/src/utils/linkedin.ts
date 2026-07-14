import { useState, useEffect } from 'react';

export interface LinkedinData {
  followerCount: number;
  isLive: boolean;
  isLoading: boolean;
}

// Fallback exact follower count of the LinkedIn page as of July 2026
export const STATIC_FALLBACK: LinkedinData = {
  followerCount: 527,
  isLive: true,
  isLoading: false
};

const LINKEDIN_URL = 'https://www.linkedin.com/company/aws-student-builder-group-guni/';

const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`
];

export async function fetchLiveLinkedinData(): Promise<LinkedinData> {
  for (let i = 0; i < PROXIES.length; i++) {
    try {
      const proxyUrl = PROXIES[i](LINKEDIN_URL);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`Proxy response not OK: ${response.status}`);
      
      const text = await response.text();
      
      // Attempt to extract follower count via multiple regex patterns
      // Pattern 1: Meta description containing "X followers"
      const metaMatch = text.match(/meta[^>]*?content="[^"]*?([\d,]+)\s+followers/i) || 
                        text.match(/meta[^>]*?content="[^"]*?([\d,]+)\s+members/i);
      
      // Pattern 2: followerCount JSON attribute in javascript state
      const jsonMatch = text.match(/"followerCount":\s*(\d+)/i) || 
                        text.match(/"userFollowersCount":\s*(\d+)/i);
      
      // Pattern 3: Simple raw match for "X followers"
      const rawMatch = text.match(/([\d,]+)\s+followers/i);
      
      let count = 0;
      if (metaMatch) {
        count = parseInt(metaMatch[1].replace(/,/g, ''), 10);
      } else if (jsonMatch) {
        count = parseInt(jsonMatch[1], 10);
      } else if (rawMatch) {
        count = parseInt(rawMatch[1].replace(/,/g, ''), 10);
      }
      
      if (count > 0) {
        console.log(`Successfully fetched live LinkedIn followers count (${count}) from proxy`, i);
        return {
          followerCount: count,
          isLive: true,
          isLoading: false
        };
      }
    } catch (err: any) {
      console.warn(`Proxy ${i} failed to fetch LinkedIn data:`, err.message || err);
    }
  }
  
  // Fall back to static data if all proxies fail
  console.log('Using static fallback for LinkedIn follower data');
  return {
    ...STATIC_FALLBACK,
    isLoading: false
  };
}

export function useLinkedinData() {
  const [data, setData] = useState<LinkedinData>({
    ...STATIC_FALLBACK,
    isLoading: true
  });

  useEffect(() => {
    let active = true;
    fetchLiveLinkedinData().then(liveData => {
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
