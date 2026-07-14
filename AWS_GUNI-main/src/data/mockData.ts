export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: 'coordinator' | 'mentor' | 'core' | 'executive' | 'technical' | 'marketing';
  department: string;
  photo: string;
  linkedin: string;
  github?: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  type: 'workshop' | 'hackathon' | 'speaker' | 'community';
  status: 'upcoming' | 'ongoing' | 'past';
  poster: string;
  description: string;
  details: string;
  speakers?: (string | { name: string; linkedin?: string; designation?: string })[];
  itinerary?: { time: string; activity: string }[];
  registrationUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'workshop' | 'hackathon' | 'speaker' | 'community';
  image: string;
  date: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  // Faculty Coordinator
  {
    id: 'f-coord-1',
    name: 'Dr. Amit Patel',
    position: 'Faculty Coordinator',
    role: 'coordinator',
    department: 'Computer Science & Engineering',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  // Faculty Mentors
  {
    id: 'f-mentor-1',
    name: 'Prof. Sneha Sharma',
    position: 'Faculty Mentor',
    role: 'mentor',
    department: 'Information Technology',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'f-mentor-2',
    name: 'Prof. Rajesh Mehta',
    position: 'Faculty Mentor',
    role: 'mentor',
    department: 'Computer Engineering',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  // Core Team
  {
    id: 'core-1',
    name: 'Aryan Shah',
    position: 'Student Lead',
    role: 'core',
    department: 'CSE - Cloud Computing (B.Tech)',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: 'core-2',
    name: 'Diya Vyas',
    position: 'Co-Lead',
    role: 'core',
    department: 'Information Technology (B.Tech)',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  // Executive Team
  {
    id: 'exe-1',
    name: 'Karan Dave',
    position: 'Operations Head',
    role: 'executive',
    department: 'CSE (B.Tech)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'exe-2',
    name: 'Riddhi Patel',
    position: 'Treasurer',
    role: 'executive',
    department: 'Computer Engineering',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  // Technical Team
  {
    id: 'tech-1',
    name: 'Smit Joshi',
    position: 'Cloud Architect Lead',
    role: 'technical',
    department: 'CSE - Cloud Computing',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: 'tech-2',
    name: 'Neha Prajapati',
    position: 'AI/ML Specialist',
    role: 'technical',
    department: 'CSE - Artificial Intelligence',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: 'tech-3',
    name: 'Devan Patel',
    position: 'DevOps Engineer',
    role: 'technical',
    department: 'Information Technology',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  // Marketing & Design Team
  {
    id: 'mkt-1',
    name: 'Anjali Panchal',
    position: 'Design Lead',
    role: 'marketing',
    department: 'Computer Engineering',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'mkt-2',
    name: 'Rohan Trivedi',
    position: 'Content & Socials Head',
    role: 'marketing',
    department: 'Information Technology',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'event-upcoming-1',
    name: 'AWS Gujarat Students Builder Week 2026',
    date: 'July 5 - 11, 2026',
    venue: 'Online Event (Meetup Live)',
    type: 'community',
    status: 'ongoing',
    poster: '/gallery/gujarat_builder_week_poster.png',
    description: 'Get ready for AWS Gujarat Students Builder Week 2026 — a 7-day virtual learning experience organized by the AWS Student Builder Group Leaders – Gujarat.',
    details: 'Get ready for AWS Gujarat Students Builder Week 2026 — a 7-day virtual learning experience organized by the AWS Student Builder Group Leaders – Gujarat.\n\nWhat to expect:\n- 10+ Industry Experts & Community Leaders\n- 7 Days of Continuous Learning\n- Live Interactive Q&A Sessions\n- E-Certificates for Special Achievers\n- Hands-on AWS & Cloud Learning\n\n🗓️ Date: 5th – 11th July 2026\n📍 Mode: Online\n⏰ Time: To be announced\n🎟️ Registration is open on Meetup! Join us to learn, connect, and build with the AWS community.',
    speakers: [
      {
        name: 'Harshil Maniyar (Co-organizer)',
        designation: 'AWS Student Builder Group Leader'
      }
    ],
    itinerary: [
      { time: 'Day 1 - Day 7', activity: 'Hands-on Cloud Learning sessions with 10+ Industry Experts' }
    ],
    registrationUrl: 'https://www.meetup.com/aws-sbg-at-ganpat-university/events/315424216/'
  },
  {
    id: 'event-1',
    name: 'GEN AI ON AWS',
    date: 'May 25, 2026',
    venue: 'Online Event (Meetup Live)',
    type: 'speaker',
    status: 'past',
    poster: '/gallery/Poster2.png',
    description: 'An online technical session illustrating the future of Generative AI, featuring industry use cases, building agents, and real-world tools using AWS Bedrock.',
    details: 'The "Gen AI on AWS" session was organized to introduce students to the rapidly evolving field of Generative Artificial Intelligence and its integration with cloud technologies through AWS. The event witnessed enthusiastic participation from students, reflecting their growing interest in AI, Machine Learning, and cloud computing.\n\nThe session was delivered by Mr. Ashwin Raiyani, who provided valuable industry insights and practical knowledge on topics such as the AWS Generative AI Stack, Amazon Bedrock, Foundation Models as a Service (FMaaS), and chatbot architecture using API Gateway integration. Through real-world examples and use cases, participants gained a clear understanding of how Generative AI solutions are developed and deployed in modern organizations.\n\nThe event served as a platform to bridge the gap between academic concepts and industry applications, helping students explore emerging technologies, career opportunities, certifications, and project-based learning in the AI and cloud domains. The interactive discussions and Q&A session further enhanced engagement, creating an enriching learning experience for all attendees.\n\nOverall, the "Gen AI on AWS" event successfully expanded students\' knowledge of Generative AI, increased awareness of AWS-powered AI solutions, and inspired participants to pursue further learning and innovation in the field of Artificial Intelligence and Cloud Computing.',
    speakers: [
      {
        name: 'Mr. Ashwin Raiyani (Expert AI Speaker)',
        linkedin: 'https://www.linkedin.com/in/ashwinraiyani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    ],
    itinerary: [
      { time: '04:00 PM - 04:15 PM', activity: 'Introduction to GenAI' },
      { time: '04:15 PM - 05:00 PM', activity: 'AWS Bedrock Service Walkthrough' },
      { time: '05:00 PM - 05:30 PM', activity: 'Q&A & Learning Roadmaps' }
    ],
    registrationUrl: 'https://www.meetup.com/aws-sbg-at-ganpat-university/'
  },
  {
    id: 'event-2',
    name: 'AWS Cloud Ignite',
    date: 'March 25, 2026',
    venue: '209 Seminar Hall, New Building, Ganpat University, Mehsana',
    type: 'workshop',
    status: 'past',
    poster: '/gallery/Poster1.png',
    description: 'AWS Cloud Ignite was a flagship cloud computing awareness event organized by the AWS Cloud Club Ganpat University on 25th March 2026 at Seminar Hall 209, Ganpat University. The event was designed to introduce students to the fundamentals of cloud computing and the vast ecosystem of Amazon Web Services (AWS), while highlighting emerging industry trends and career opportunities in the cloud domain.',
    details: 'The program witnessed an overwhelming response from students, receiving more than 600 registrations. Due to venue limitations, approximately 200 students attended the event, demonstrating the growing interest in cloud technologies among the student community.\n\nThe event featured renowned AWS community leaders and cloud experts, including Nilesh Vaghela, Dimple Vaghela, and Aric Pandya, who shared valuable insights into AWS services, cloud architecture, industry best practices, certifications, and career pathways. Through engaging discussions and real-world examples, the speakers successfully connected academic concepts with practical industry applications, enabling students to gain a deeper understanding of modern cloud technologies.\n\nThe presence of distinguished university dignitaries and faculty members further enriched the event and encouraged students to actively participate in technology-driven learning initiatives. Interactive discussions, question-and-answer sessions, and the fun-filled “Only Wrong Answers” activity created an energetic and collaborative learning environment that kept participants engaged throughout the program.\n\nOverall, AWS Cloud Ignite served as an impactful platform for students to explore cloud computing, interact with industry experts, and gain valuable knowledge about AWS technologies. The event successfully achieved its objective of fostering cloud awareness, enhancing technical understanding, and inspiring students to pursue future opportunities in cloud computing and related technologies.',
    speakers: [
      {
        name: 'Nilesh Vaghela',
        designation: 'AWS Community Hero',
        linkedin: 'https://www.linkedin.com/in/nilesh-vaghela?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      },
      {
        name: 'Dimple Vaghela',
        designation: 'AWS Community Hero, AWS User Group Leader',
        linkedin: 'https://www.linkedin.com/in/dimple-vaghela-ba45447b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      },
      {
        name: 'Aric Pandya',
        designation: 'AWS Community Builder (Security)',
        linkedin: 'https://linkedin.com/in/aricpandya'
      }
    ],
    itinerary: [
      { time: '10:00 AM - 10:30 AM', activity: 'Keynote & Launch' },
      { time: '10:30 AM - 12:00 PM', activity: 'EC2 & S3 Console Hands-On' },
      { time: '12:00 PM - 01:00 PM', activity: 'Q&A & Career Guidance' }
    ],
    registrationUrl: 'https://www.meetup.com/aws-sbg-at-ganpat-university/'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'AWS Cloud Ignite - Offline Session',
    category: 'workshop',
    image: '/gallery/workshop1.png',
    date: 'March 2026'
  },
  {
    id: 'gal-2',
    title: 'GenAI on AWS - Live Expert Session',
    category: 'workshop',
    image: '/gallery/workshop2.png',
    date: 'May 2026'
  },
  {
    id: 'gal-5',
    title: 'Keynote by Mr. Ashwin Raiyani',
    category: 'speaker',
    image: '/gallery/speaker2.png',
    date: 'May 2026'
  },
  {
    id: 'gal-6',
    title: 'Cloud Computing Insights by Nilesh Vaghela Sir & Dimple Vaghela Ma’am',
    category: 'speaker',
    image: '/gallery/speaker1.png',
    date: 'March 2026'
  },
  {
    id: 'gal-7',
    title: 'AWS Cloud Ignite Community Group Photo',
    category: 'community',
    image: '/gallery/community1.jpeg',
    date: 'January 2026'
  },
  {
    id: 'gal-8',
    title: 'AWS Student Builder Group Team Meetup',
    category: 'community',
    image: '/gallery/community2.png',
    date: 'January 2026'
  }
];
