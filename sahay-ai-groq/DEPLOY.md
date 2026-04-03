# 🚀 Sahay AI — Groq + Vercel Deploy Guide

## Pehle ye karo — Groq FREE key lena

1. Jao → https://console.groq.com
2. "Sign Up" → Google se login karo (free hai)
3. Left menu → "API Keys"
4. "Create API Key" → Copy karo
5. Key aisi dikhegi: gsk_xxxxxxxxxxxxxxxxxxxx

---

## Step 1 — GitHub pe upload karo

1. https://github.com pe jao → Login / Sign Up (free)
2. Top-right "+" → "New repository"
3. Name: sahay-ai → "Public" → "Create repository"
4. "uploading an existing file" link pe click karo
5. Saari files is folder se drag & drop karo
6. "Commit changes" click karo ✅

---

## Step 2 — Vercel pe deploy karo

1. https://vercel.com pe jao → "Sign Up with GitHub"
2. "Add New Project" → sahay-ai repo select karo → "Import"
3. ⚠️ IMPORTANT — "Environment Variables" section mein:
   - Name:  GROQ_API_KEY
   - Value: gsk_tumhari_key_yahan_paste_karo
4. "Deploy" click karo
5. 2 minute wait karo... 🎉

---

## Step 3 — Link share karo!

Deploy hone ke baad tumhe milega:
https://sahay-ai-xyz.vercel.app

Ye link WhatsApp pe share karo —
koi bhi khol sakta hai, koi key nahi chahiye!

---

## Local test karna ho to (optional)

```
cd sahay-ai-groq
npm install
cp .env.example .env
.env file mein apni GROQ_API_KEY daalo
npm start
Browser mein kholo: http://localhost:3000
```

---

## ❓ Koi problem aayi?

Mujhe screenshot bhejo — main help kar dunga!
