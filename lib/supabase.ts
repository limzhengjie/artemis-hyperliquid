import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function resolveEnv(): { url: string | null; key: string | null } {
  const serverUrl = process.env.SUPABASE_URL || null
  const serverServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null
  const serverAnonKey = process.env.SUPABASE_ANON_KEY || null
  const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null

  // Prefer server-side credentials if available
  if (serverUrl && (serverServiceKey || serverAnonKey)) {
    return { url: serverUrl, key: serverServiceKey || serverAnonKey }
  }
  if (publicUrl && publicKey) {
    return { url: publicUrl, key: publicKey }
  }
  return { url: null, key: null }
}

function createSafeClient(): SupabaseClient | null {
  const { url, key } = resolveEnv()
  if (!url || !key) return null
  return createClient(url, key)
}

// Lazily created client; may be null if env is not configured
export const supabase: SupabaseClient | null = createSafeClient()

export function getSupabase(): SupabaseClient {
  const client = supabase ?? createSafeClient()
  if (!client) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and a key in env.')
  }
  return client
}

export async function getMarketMapCategoriesAndProtocols() {
  const client = getSupabase()
  const { data, error } = await client.from('categories').select(`
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
