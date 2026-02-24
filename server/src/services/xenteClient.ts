import { z } from 'zod'

const XenteAuthResponse = z.object({
  data: z.object({
    token: z.string(),
    expiresIn: z.number().optional(),
  }),
})

type TokenCache = {
  token: string
  expiresAt: number
} | null

let cache: TokenCache = null

const baseUrl = process.env.XENTE_BASE_URL ?? 'https://api.xente.co'
const appKey = process.env.XENTE_APP_KEY
const appPassword = process.env.XENTE_APP_PASSWORD
const userId = process.env.XENTE_USER_ID

if (!appKey || !appPassword || !userId) {
  // Fail fast in dev to avoid silent 401s.
  // These will be checked when the server bootstraps.
}

async function login() {
  if (!appKey || !appPassword || !userId) {
    throw new Error('Missing Xente credentials (XENTE_APP_KEY, XENTE_APP_PASSWORD, XENTE_USER_ID)')
  }

  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appKey,
      appPassword,
      userId,
      includeRefereshToken: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Xente login failed: ${response.status} ${body}`)
  }

  const json = await response.json()
  const parsed = XenteAuthResponse.parse(json)
  return parsed.data.token
}

async function getToken() {
  const now = Date.now()
  if (cache && cache.expiresAt > now) return cache.token

  const token = await login()
  cache = {
    token,
    expiresAt: now + 55 * 60 * 1000,
  }
  return token
}

async function request<T>(path: string, options?: RequestInit) {
  const token = await getToken()
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })

  const bodyText = await response.text()
  if (!response.ok) {
    throw new Error(`Xente request failed: ${response.status} ${bodyText}`)
  }

  return bodyText ? (JSON.parse(bodyText) as T) : ({} as T)
}

export async function getAccount() {
  return request('/api/accounts')
}

export async function validateProduct(payload: unknown) {
  return request('/api/products/validation', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postMobileMoneyCollection(payload: unknown) {
  return request('/api/transactions/collect', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postMobileMoneyPayout(payload: unknown) {
  return request('/api/transactions/payouts/mobilemoney', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postBankTransfer(payload: unknown) {
  return request('/api/transactions/transfer/bank', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
