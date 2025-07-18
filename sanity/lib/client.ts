import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ⛔️ Turn off CDN if using token
  token: process.env.SANITY_API_TOKEN, // ✅ Add this line
})