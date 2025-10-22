/* ----------------------------
FRONTEND: pages/index.jsx
---------------------------- */
'use client'

import axios from 'axios'
import React, {useState} from 'react'


export default function Home(){
const [groupIdOrName, setGroupIdOrName] = useState('')
const [memberPhone, setMemberPhone] = useState('')
const [loading, setLoading] = useState(false)
const [result, setResult] = useState(null)
const [error, setError] = useState(null)
console.log('GroupNameOrId:', groupIdOrName, 'MemberPhone:', memberPhone)

async function fetchLastMessage(){
setLoading(true); setError(null); setResult(null)
try{
    const res = await axios.post('/api/whatsapp/last-group-message',{
        group: groupIdOrName, member: memberPhone
    })
    const body = await res.json()
    if(!res.ok) throw new Error(body?.error || 'Unknown error')
    setResult(body)
}catch(e){
    setError(e.message)
}finally{ setLoading(false) }
}


return (
<main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
<div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
<h1 className="text-2xl font-semibold mb-4">WhatsApp — Last message by member</h1>
<p className="text-sm text-gray-600 mb-6">Enter a WhatsApp group name or ID and the member phone (E.164). The app will call a server API which in turn queries your WhatsApp provider.</p>


<label className="block mb-3">
<div className="text-sm font-medium mb-1">Group name or Group ID</div>
<input value={groupIdOrName} onChange={e=>setGroupIdOrName(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. My Sales Group OR 1234567890-123@g.us" />
</label>


<label className="block mb-4">
<div className="text-sm font-medium mb-1">Member phone (E.164) — optional</div>
<input value={memberPhone} onChange={e=>setMemberPhone(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. +8801XXXXXXXXX (leave blank for last message by anyone)" />
</label>


<div className="flex gap-3">
<button disabled={loading} onClick={fetchLastMessage} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60">{loading? 'Fetching...':'Get last message'}</button>
<button onClick={()=>{ setGroupIdOrName(''); setMemberPhone(''); setResult(null); setError(null) }} className="px-4 py-2 border rounded-md">Reset</button>
</div>


<div className="mt-6">
{error && <div className="text-red-600">Error: {error}</div>}
{result && (
<div className="bg-gray-50 p-4 rounded-md border mt-2">
<div className="text-sm text-gray-500">Group:</div>
<div className="font-medium mb-2">{result.group || '—'}</div>


<div className="text-sm text-gray-500">Member:</div>
<div className="mb-2">{result.member || '—'}</div>


<div className="text-sm text-gray-500">Last message:</div>
<div className="mt-1 whitespace-pre-wrap">{result.message || 'No messages found'}</div>


<div className="text-xs text-gray-400 mt-3">Fetched at: {new Date(result.fetchedAt).toLocaleString()}</div>
</div>
)}
</div>
</div>
</main>
)
}