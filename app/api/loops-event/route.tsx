import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, eventName } = await req.json()

  if (!email || !eventName) {
    return NextResponse.json(
      { error: 'Missing email or eventName' },
      { status: 400 }
    )
  }

  const res = await fetch('https://app.loops.so/api/v1/events/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`
    },
    body: JSON.stringify({
      email,
      eventName
    })
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
