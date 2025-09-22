
'use client'

import { useEffect, useState } from 'react'

import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FeedbackPage() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    chartIdea: '',
    presentation: '',
    telegramHandle: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<{
    id: string
    chartIdea: string
    presentation: string
    telegramHandle: string
    votes: number
  }>>([])
  const [votesRecord, setVotesRecord] = useState<Record<string, 'up' | 'down'>>({})

  // hydrate vote record from session (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('artemis_feedback_votes')
      if (raw) setVotesRecord(JSON.parse(raw))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('artemis_feedback_votes', JSON.stringify(votesRecord))
    } catch {}
  }, [votesRecord])

  // fetch suggestions from API
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/feedback', { method: 'GET' })
        const json = await res.json()
        if (!cancelled && json?.ok && Array.isArray(json.data)) {
          setSuggestions(json.data)
        }
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleUpvote(id: string) {
    if (votesRecord[id]) return
    setVotesRecord(prev => ({ ...prev, [id]: 'up' }))
    setSuggestions(prev => prev.map(s => (s.id === id ? { ...s, votes: s.votes + 1 } : s)))
    try {
      const res = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'up' })
      })
      const json = await res.json()
      if (json?.ok && typeof json.votes === 'number') {
        setSuggestions(prev => prev.map(s => (s.id === id ? { ...s, votes: json.votes } : s)))
      }
    } catch {}
  }
  async function handleDownvote(id: string) {
    if (votesRecord[id]) return
    setVotesRecord(prev => ({ ...prev, [id]: 'down' }))
    setSuggestions(prev => prev.map(s => (s.id === id ? { ...s, votes: s.votes - 1 } : s)))
    try {
      const res = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'down' })
      })
      const json = await res.json()
      if (json?.ok && typeof json.votes === 'number') {
        setSuggestions(prev => prev.map(s => (s.id === id ? { ...s, votes: json.votes } : s)))
      }
    } catch {}
  }

  async function onSubmit() {
    setLoading(true)
    setSubmitted(false)
    try {
      const payload = {
        chartIdea: form.chartIdea.trim(),
        presentation: form.presentation.trim(),
        telegramHandle: form.telegramHandle.trim()
      }
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const json = await res.json()
      if (json?.ok && json?.data) {
                      setSuggestions(prev => [json.data as {
                        id: string
                        chartIdea: string
                        presentation: string
                        telegramHandle: string
                        votes: number
                      }, ...prev])
      } else {
        // fallback optimistic
        const fallback = { id: `${Date.now()}`, votes: 0, ...payload }
        setSuggestions(prev => [fallback as { id: string; chartIdea: string; presentation: string; telegramHandle: string; votes: number }, ...prev])
      }
      setSubmitted(true)
      setForm({ chartIdea: '', presentation: '', telegramHandle: '' })
      setTimeout(() => setOpen(false), 1000)
    } catch {
      // noop for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-12">
      <ContentWrapper>
        <div className="w-full max-w-[840px] mx-auto flex flex-col items-center gap-6">
          <Blurb
            title="Have feedback or a chart idea?"
            description="Tell us what you'd like to see. Your suggestions help shape our roadmap."
            textAlignment="center"
          />
          <Button variant="cta" onClick={() => setOpen(true)}>Add Suggestion</Button>

          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
              <div className="relative bg-background w-full max-w-[560px] rounded-lg border shadow-xl">
                <div className="px-5 pt-4 pb-3 border-b">
                  <div className="text-foreground font-semibold">Share your suggestion</div>
                </div>
                <div className="px-5 py-4 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="chartIdea">What charts do you think will be important?</Label>
                    <Input
                      id="chartIdea"
                      placeholder="e.g., Perp volume vs funding rates over time"
                      value={form.chartIdea}
                      onChange={e => setForm(prev => ({ ...prev, chartIdea: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="presentation">How should the chart be presented?</Label>
                    <Input
                      id="presentation"
                      placeholder="e.g., Line with 7d MA, stacked bar %, dual-axis"
                      value={form.presentation}
                      onChange={e => setForm(prev => ({ ...prev, presentation: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="telegramHandle">Your Telegram handle (optional)</Label>
                    <Input
                      id="telegramHandle"
                      placeholder="e.g., @yourhandle"
                      value={form.telegramHandle}
                      onChange={e => setForm(prev => ({ ...prev, telegramHandle: e.target.value }))}
                    />
                  </div>
                  {submitted && (
                    <div className="text-green-600 text-sm">Thanks! Your suggestion was sent.</div>
                  )}
                </div>
                <div className="px-5 pb-5 pt-1 flex items-center gap-3 justify-end">
                  <Button onClick={onSubmit} disabled={loading || !form.chartIdea.trim()}>
                    {loading ? 'Sending…' : 'Submit'}
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-4">
          <Card>
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle>Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-t border-b border-[var(--color-pluto-purple-500)] bg-[rgba(94,78,181,0.06)]">
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-pluto-purple-500)]">Chart idea</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-pluto-purple-500)]">Presentation</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-pluto-purple-500)]">Telegram</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-pluto-purple-500)]">Votes</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-pluto-purple-500)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestions.length === 0 ? (
                      <tr>
                        <td className="px-4 py-6 text-muted-foreground" colSpan={5}>
                          No suggestions yet. Be the first to add one.
                        </td>
                      </tr>
                    ) : (
                      [...suggestions].sort((a, b) => b.votes - a.votes).map(s => (
                        <tr key={s.id} className="border-t">
                          <td className="px-4 py-3 align-top">{s.chartIdea}</td>
                          <td className="px-4 py-3 align-top">{s.presentation}</td>
                          <td className="px-4 py-3 align-top">{s.telegramHandle || '—'}</td>
                          <td className="px-4 py-3 align-top font-medium text-[var(--color-pluto-purple-500)]">{s.votes}</td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpvote(s.id)}
                                disabled={!!votesRecord[s.id]}
                                className="border-[var(--color-pluto-purple-500)] text-[var(--color-pluto-purple-500)] hover:bg-[rgba(94,78,181,0.06)]"
                              >
                                ▲ Upvote
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownvote(s.id)}
                                disabled={!!votesRecord[s.id]}
                                className="border-[var(--color-pluto-purple-500)] text-[var(--color-pluto-purple-500)] hover:bg-[rgba(94,78,181,0.06)]"
                              >
                                ▼ Downvote
                              </Button>
                              {votesRecord[s.id] && (
                                <span className="text-xs text-muted-foreground">You voted</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentWrapper>
    </div>
  )
}


