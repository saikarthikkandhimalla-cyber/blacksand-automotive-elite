import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'g2tb2cig',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: unknown) => builder.image(source)
