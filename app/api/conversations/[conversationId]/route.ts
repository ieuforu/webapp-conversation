import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getInfo } from '@/app/api/utils/common'
import { API_KEY, API_URL } from '@/config'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  const { conversationId } = await params
  const { user } = getInfo(request)

  try {
    const response = await fetch(
      `${API_URL}/conversations/${conversationId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ user }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: errorText },
        { status: response.status },
      )
    }

    // 处理 204 No Content
    if (response.status === 204) {
      return NextResponse.json({ result: 'success' })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    )
  }
}
