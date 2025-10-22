import { NextResponse } from "next/server"

export async function POST(req) {
const { group, member } = await req.json()
console.log('Received request for group:', group, 'member:', member)
//if(!group) return NextResponse.json({ error: 'SSC 2002 FB High School' })


try{
// Example: If you have a provider that exposes a messages endpoint for groups:
const PROVIDER_BASE = process.env.PROVIDER_BASE_URL
const PROVIDER_TOKEN = process.env.PROVIDER_TOKEN
const q = member ? `?member=${encodeURIComponent(member)}&limit=1` : '?limit=1'
const r = await fetch(`${PROVIDER_BASE}/groups/${encodeURIComponent(group)}/messages${q}`, {
headers: { Authorization: `Bearer ${PROVIDER_TOKEN}` }
})
console.log('Provider response status:', r.status)
if(!r.ok){
const errorBody = await r.text()    
const data = await r.json()
}


// Since providers differ, we'll return a mocked response structure — replace with real provider response parsing.


// TODO: Replace with real provider call
const mock = {
group: group,
member: member || 'any',
message: member ? `Last message from ${member}: Hello from ${group}` : `Last message in ${group} by +8801735468084: Hello everyone!`,
fetchedAt: new Date().toISOString()
}


return NextResponse.json(mock)
}catch(err){
console.error(err)
return NextResponse.json({ error: 'Internal server error' })
}
}