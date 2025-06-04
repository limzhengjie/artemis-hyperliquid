import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string
)

// function to trigger revalidation when data changes
export async function triggerRevalidation() {
  const response = await fetch('/api/revalidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: '/market-map',
      secret: process.env.REVALIDATION_SECRET
    })
  })

  if (!response.ok) {
    console.error('Failed to revalidate')
  }
}

// set up realtime subscription
export function setupRealtimeSubscription() {
  const channel = supabase
    .channel('market_map_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'protocols_categories'
      },
      () => {
        triggerRevalidation()
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'protocols_metadata'
      },
      () => {
        triggerRevalidation()
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'categories'
      },
      () => {
        triggerRevalidation()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

export async function getMarketMapCategoriesAndProtocols() {
  const { data, error } = await supabase.from('categories').select(`
      *,
      protocols_categories(
        protocols_metadata(*)
      )
    `)

  if (error) throw error

  // flatten the response structure
  return data.map((category: CategoryWithProtocolsType) => ({
    category: category.category,
    label: category.label,
    protocols: category.protocols_categories.map(pc => ({
      ...pc.protocols_metadata
    }))
  }))
}

type CategoryType = {
  category: string
  label: string
  bucket: string
}

type ProtocolMetadataType = {
  protocol: string
  name: string
  description: string
  logo: string
  website: string
  twitter: string
  artemisProjectPage: string | null
  type: 'primary' | 'secondary'
}

type ProtocolAndCategoryType = {
  protocol: string
  category: string
}

type CategoryWithProtocolsType = CategoryType & {
  protocols_categories: (ProtocolAndCategoryType & {
    protocols_metadata: ProtocolMetadataType
  })[]
}

export type FormattedCategoryWithProtocolsType = {
  category: string
  label: string
  protocols: ProtocolMetadataType[]
}
