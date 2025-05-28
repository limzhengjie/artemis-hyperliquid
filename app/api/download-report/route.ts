import { NextResponse } from 'next/server'

const FORM_ID = 'stablecoin-report-2025-download'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const res = await fetch(`https://api.artemisxyz.com/save-email/${FORM_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  if (!res.ok) {
    const error = await res.json()
    return NextResponse.json({ error }, { status: res.status })
  }

  return NextResponse.json(
    { message: 'Email saved successfully' },
    { status: 200 }
  )
}
