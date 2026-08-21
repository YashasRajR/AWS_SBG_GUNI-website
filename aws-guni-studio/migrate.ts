import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Using dynamic import for the mock data so we don't trip over JSX if it's imported in the chain
import { TEAM_MEMBERS, EVENTS, GALLERY_ITEMS } from '../AWS_GUNI-main/src/data/mockData';

const projectId = '32efj5mi';
const token = 'skNfx2QG4ZfDplCgQOBEJCIMGHpBoHXOyKxYwXVpe3UZoIxXJ3zGQOXf88RThSxlBZ92mDUMSOkEnYEKjaRjQDTMDEndGW0URZEXKby2oqBjx9z9Z2aXC1BBt7nkbcuXuF7hSZllD3d7BkfDwPJpxe58N4vFTYvX2JRAIx9xGOmEf22ecMLk';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2023-05-03',
});

async function uploadImage(imageSource: string): Promise<string | null> {
  if (!imageSource) return null;
  try {
    let buffer: Buffer;
    let filename: string;

    if (imageSource.startsWith('http')) {
      const response = await fetch(imageSource);
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      filename = 'downloaded-image.jpg';
    } else {
      const localPath = path.join(__dirname, '../AWS_GUNI-main/public', imageSource);
      if (fs.existsSync(localPath)) {
        buffer = fs.readFileSync(localPath);
        filename = path.basename(localPath);
      } else {
        console.warn(`Local image not found: ${localPath}`);
        return null;
      }
    }

    const asset = await client.assets.upload('image', buffer, { filename });
    console.log(`Uploaded image asset: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imageSource}:`, error);
    return null;
  }
}

async function migrate() {
  console.log('Starting migration...');

  // 1. Team Members
  for (const member of TEAM_MEMBERS) {
    console.log(`Migrating team member: ${member.name}`);
    const assetId = await uploadImage(member.photo);
    await client.createOrReplace({
      _id: `team-member-${member.id}`,
      _type: 'teamMember',
      name: member.name,
      position: member.position,
      role: member.role,
      department: member.department,
      photo: assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined,
      linkedin: member.linkedin,
      github: member.github,
    });
  }

  // 2. Events
  for (const evt of EVENTS) {
    console.log(`Migrating event: ${evt.name}`);
    const assetId = await uploadImage(evt.poster);
    
    const speakers = evt.speakers?.map((s: any) => {
      if (typeof s === 'string') return { _key: Math.random().toString(), name: s };
      return { ...s, _key: Math.random().toString() };
    });

    const itinerary = evt.itinerary?.map((i: any) => ({ ...i, _key: Math.random().toString() }));

    await client.createOrReplace({
      _id: `event-${evt.id}`,
      _type: 'event',
      name: evt.name,
      date: evt.date,
      venue: evt.venue,
      type: evt.type,
      status: evt.status,
      poster: assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined,
      description: evt.description,
      details: evt.details,
      speakers: speakers,
      itinerary: itinerary,
      registrationUrl: evt.registrationUrl,
    });
  }

  // 3. Gallery
  for (const item of GALLERY_ITEMS) {
    console.log(`Migrating gallery item: ${item.title}`);
    const assetId = await uploadImage(item.image);
    await client.createOrReplace({
      _id: `gallery-item-${item.id}`,
      _type: 'galleryItem',
      title: item.title,
      category: item.category,
      image: assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined,
      date: item.date,
    });
  }

  // Singletons
  console.log('Creating singletons...');
  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings', title: 'AWS GUNI Website' });
  await client.createIfNotExists({ _id: 'header', _type: 'header' });
  await client.createIfNotExists({ _id: 'footer', _type: 'footer' });
  await client.createIfNotExists({ _id: 'heroSection', _type: 'heroSection', heading: 'Empowering Students in Cloud Technology' });
  await client.createIfNotExists({ _id: 'aboutSection', _type: 'aboutSection', title: 'About Us' });
  await client.createIfNotExists({ _id: 'contactSection', _type: 'contactSection', title: 'Contact Us' });

  console.log('Migration complete!');
}

migrate().catch(console.error);
