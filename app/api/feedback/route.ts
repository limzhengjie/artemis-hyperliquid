import { getSupabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// In-memory fallback for dev if Supabase isn't configured
const MEMORY_STORE: Array<{
  id: number
  chart_idea: string
  presentation: string
  telegram_handle: string
  votes: number
  created_at: string
}> = []

function fallbackList() {
  return [...MEMORY_STORE]
    .sort((a, b) => (b.votes - a.votes) || (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
    .map(r => ({
      id: String(r.id),
      chartIdea: r.chart_idea,
      presentation: r.presentation,
      telegramHandle: r.telegram_handle,
      votes: r.votes
    }))
}

function makeId(): number {
  return Date.now() + Math.floor(Math.random() * 1000)
}

 

export async function GET() {
  try {
    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('feedback')
        .select('id, chart_idea, presentation, telegram_handle, votes, created_at')
        .order('votes', { ascending: false })
        .order('created_at', { ascending: false })
      if (error) throw error
      const rows = (data || []).map(r => ({
        id: String(r.id),
        chartIdea: r.chart_idea || '',
        presentation: r.presentation || '',
        telegramHandle: r.telegram_handle || '',
        votes: typeof r.votes === 'number' ? r.votes : 0
      }))
      return NextResponse.json({ ok: true, data: rows })
    } catch {
      return NextResponse.json({ ok: true, data: fallbackList() })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Basic shape validation
    const chartIdea = String(body?.chartIdea || '')
    const presentation = String(body?.presentation || '')
    const telegramHandle = String(body?.telegramHandle || '')

    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          chart_idea: chartIdea,
          presentation: presentation,
          telegram_handle: telegramHandle
        })
        .select('id, chart_idea, presentation, telegram_handle, votes, created_at')
        .single()
      if (error) throw error
      const row = {
        id: String(data.id),
        chartIdea: data.chart_idea || '',
        presentation: data.presentation || '',
        telegramHandle: data.telegram_handle || '',
        votes: typeof data.votes === 'number' ? data.votes : 0
      }
      return NextResponse.json({ ok: true, data: row })
    } catch {
      const id = makeId()
      const created_at = new Date().toISOString()
      MEMORY_STORE.push({
        id,
        chart_idea: chartIdea,
        presentation,
        telegram_handle: telegramHandle,
        votes: 0,
        created_at
      })
      return NextResponse.json({
        ok: true,
        data: {
          id: String(id),
          chartIdea,
          presentation,
          telegramHandle,
          votes: 0
        }
      })
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const idNum = Number(body?.id)
    const action = body?.action === 'up' || body?.action === 'down' ? body.action : null
    if (!Number.isFinite(idNum) || !action) return NextResponse.json({ ok: false }, { status: 400 })

    try {
      const supabase = getSupabase()
      const { data: existing, error: selErr } = await supabase
        .from('feedback')
        .select('votes')
        .eq('id', idNum)
        .single()
      if (selErr) throw selErr
      const current = typeof existing?.votes === 'number' ? existing.votes : 0
      const delta = action === 'up' ? 1 : -1
      const next = current + delta
      const { error: updErr } = await supabase
        .from('feedback')
        .update({ votes: next })
        .eq('id', idNum)
      if (updErr) throw updErr
      return NextResponse.json({ ok: true, votes: next })
    } catch {
      const idx = MEMORY_STORE.findIndex(r => r.id === idNum)
      if (idx === -1) return NextResponse.json({ ok: false }, { status: 404 })
      const delta = action === 'up' ? 1 : -1
      MEMORY_STORE[idx].votes = (MEMORY_STORE[idx].votes || 0) + delta
      return NextResponse.json({ ok: true, votes: MEMORY_STORE[idx].votes })
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


