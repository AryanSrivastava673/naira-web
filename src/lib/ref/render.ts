/**
 * Renders the blog in the redesigned (reference) look from live Sanity data.
 *
 * The visual design lives in templates.ts (generated from the reference artifact);
 * this file only fills the data regions, so new posts published in Sanity show up
 * automatically (routes revalidate every 60s). SEO output (title, canonical, Open
 * Graph, Article + FAQ JSON-LD) matches what the previous Next pages emitted.
 */
import { getPostBySlug, getPosts, urlFor } from '@/lib/sanity'
import type { Post } from '@/lib/types'
import { LISTING_TEMPLATE, POST_TEMPLATE } from './templates'

const SITE = 'https://nairamenus.in'

type Cat = 'tap' | 'billing' | 'growth'
const CAT_LABEL: Record<Cat, string> = { tap: 'Menus & Tap', billing: 'Billing', growth: 'Google Growth' }

/** Category the reference design assigned to posts whose Sanity `categories` is empty. */
const REFERENCE_CAT: Record<string, Cat> = {
  'what-to-do-when-food-prices-rise-as-a-restaurant-owner': 'tap',
  'tips-to-increase-google-review-rating-for-restaurants-and-cafes': 'growth',
  'table-decor-ideas-for-cafes-8-ideas-that-go-noticed': 'tap',
  '5-reasons-why-changing-your-restaurant-menu-matters-reddit': 'tap',
  'customer-retention-strategies-for-restaurant': 'tap',
  'restaurant-seo-the-diners-you-re-losing-to-google': 'growth',
  'does-online-presence-optimization-actually-work': 'growth',
  'restaurant-improvement-ideas-for-cafes': 'tap',
  '6-ways-to-increase-sales-for-your-restaurant': 'growth',
  'your-restaurant-is-losing-money-your-pos-system-knows-why': 'billing',
  'smart-menu-design-tricks-that-increase-the-aov-in-restaurants': 'tap',
  'nfc-menu-vs-qr-code-restaurants': 'tap',
  'online-presence-for-restaurants-the-always-overlooked-numbers': 'growth',
  'the-rs-50-000-pos-setup-mistake-most-indian-restaurant-owners-make': 'billing',
  'are-paper-menus-secretly-costing-your-restaurants-lakhs': 'tap',
  'nfc-menu-restaurants-india-naira-tap': 'tap',
}

function matchCat(s: string): Cat | null {
  const k = s.toLowerCase().replace(/[^a-z]/g, '')
  if (k.includes('billing') || k.includes('pos')) return 'billing'
  if (k.includes('growth') || k.includes('google') || k.includes('seo')) return 'growth'
  if (k.includes('tap') || k.includes('menu') || k.includes('nfc')) return 'tap'
  return null
}

export function categoryOf(post: Post): Cat {
  for (const c of post.categories ?? []) {
    const m = matchCat(c)
    if (m) return m
  }
  const byRef = REFERENCE_CAT[post.slug.current]
  if (byRef) return byRef
  return matchCat(`${post.headline} ${post.slug.current}`) ?? 'tap'
}

// ---------- helpers ----------
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c])
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Dates are shown in IST, like the audience. */
function ist(iso: string) {
  const d = new Date(new Date(iso).getTime() + 5.5 * 3600 * 1000)
  return { d: d.getUTCDate(), m: d.getUTCMonth(), y: d.getUTCFullYear(), iso: d.toISOString().slice(0, 10) }
}
const dateShort = (iso: string) => { const t = ist(iso); return `${t.d} ${MONTHS[t.m]} ${t.y}` }
const dateLong = (iso: string) => { const t = ist(iso); return `${t.d} ${MONTHS_LONG[t.m]} ${t.y}` }

const imgUrl = (post: Post, w: number, h: number) =>
  post.headerImage?.asset ? urlFor(post.headerImage).width(w).height(h).url() : null

function fill(tpl: string, vars: Record<string, string>): string {
  // single pass so values containing "{{...}}" are never re-expanded
  return tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`template placeholder ${k} not provided`)
    return vars[k]
  })
}

const jsonLd = (o: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}

// ---------- cards ----------
function card(post: Post, variant: 'big' | 'row' | ''): string {
  const cat = categoryOf(post)
  const label = esc(CAT_LABEL[cat])
  const href = `/blog/${esc(post.slug.current)}`
  const src = imgUrl(post, variant === 'big' ? 1200 : 800, variant === 'big' ? 675 : 450)
  const img = src ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">` : ''
  const excerpt = post.excerpt ? `<p>${esc(post.excerpt)}</p>` : ''
  return (
    `<article class="bc ${variant}" data-cat="${cat}"><a class="bc-img" href="${href}"><span>${label}</span>${img}</a>` +
    `<div class="bc-tx"><span class="kick">${label}</span><h2><a href="${href}">${esc(post.headline)}</a></h2>${excerpt}` +
    `<span class="by">${esc(post.author?.name ?? 'Naira Team')} · <time>${dateShort(post.publishedAt)}</time></span></div></article>`
  )
}

function feed(posts: Post[]): string {
  if (posts.length === 0) return '<p class="cempty">New articles are on the way.</p>'
  const [first, ...others] = posts
  const side = others.slice(0, 3)
  const rest = others.slice(3)
  return (
    `<div class="top">${card(first, 'big')}` +
    (side.length ? `<div class="side">${side.map((p) => card(p, 'row')).join('')}</div>` : '') +
    `</div>` +
    (rest.length
      ? `<div class="rule"><span>Latest</span></div><div class="rest">${rest.map((p) => card(p, '')).join('')}</div>`
      : '')
  )
}

// ---------- listing ----------
export async function renderListing(): Promise<Response> {
  const posts = await getPosts()
  const title = 'Naira Blog | Ideas To Run A Better Restaurant'
  const desc = 'Simple reads on menus, billing and Google growth for restaurant, cafe and salon owners. Written by the Naira Menus team.'
  const head =
    `<link rel="canonical" href="${SITE}/blog">` +
    `<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">` +
    `<meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${SITE}/blog">` +
    `<meta name="twitter:card" content="summary">`
  return html(fill(LISTING_TEMPLATE, { FEED: feed(posts), HEAD_EXTRA: head }))
}

// ---------- portable text ----------
type Span = { _type?: string; text?: string; marks?: string[] }
type Block = {
  _type: string
  _key?: string
  style?: string
  listItem?: 'bullet' | 'number'
  children?: Span[]
  markDefs?: { _key: string; _type: string; href?: string; openInNewTab?: boolean }[]
  asset?: { _ref: string }
  alt?: string
  caption?: string
}

function safeHref(h?: string) {
  const v = (h ?? '').trim()
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(v) ? v : '#'
}

function inline(b: Block): string {
  const defs = new Map((b.markDefs ?? []).map((d) => [d._key, d]))
  return (b.children ?? [])
    .map((c) => {
      let out = esc(c.text).replace(/\n/g, '<br>')
      for (const m of c.marks ?? []) {
        if (m === 'strong') out = `<b>${out}</b>`
        else if (m === 'em') out = `<em>${out}</em>`
        else if (m === 'code') out = `<code>${out}</code>`
        else if (m === 'underline') out = `<u>${out}</u>`
        else if (m === 'strike-through') out = `<s>${out}</s>`
        else {
          const d = defs.get(m)
          if (d?.href) {
            const ext = /^https?:\/\//i.test(d.href) && !d.href.startsWith(SITE)
            out = `<a href="${esc(safeHref(d.href))}"${d.openInNewTab || ext ? ' target="_blank" rel="noopener"' : ''}>${out}</a>`
          }
        }
      }
      return out
    })
    .join('')
}

function prose(body: Block[] | undefined): string {
  const out: string[] = []
  let list: 'ul' | 'ol' | null = null
  let leadDone = false
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null } }
  for (const b of body ?? []) {
    if (b._type === 'image') {
      closeList()
      if (!b.asset?._ref) continue
      const src = urlFor(b as unknown as Parameters<typeof urlFor>[0]).width(1200).url()
      out.push(
        `<figure style="margin:1.6em 0"><img src="${esc(src)}" alt="${esc(b.alt)}" loading="lazy" style="width:100%;height:auto;border-radius:16px">` +
          (b.caption ? `<figcaption style="text-align:center;font-size:13px;color:var(--muted);margin-top:8px">${esc(b.caption)}</figcaption>` : '') +
          `</figure>`,
      )
      continue
    }
    if (b._type !== 'block') continue
    const text = inline(b)
    if (b.listItem) {
      const want = b.listItem === 'number' ? 'ol' : 'ul'
      if (list !== want) { closeList(); out.push(`<${want}>`); list = want }
      out.push(`<li>${text}</li>`)
      continue
    }
    closeList()
    if (!text.trim()) continue
    switch (b.style) {
      case 'h2': out.push(`<h2>${text}</h2>`); leadDone = true; break
      case 'h3': out.push(`<h3>${text}</h3>`); leadDone = true; break
      case 'h4': out.push(`<h4>${text}</h4>`); leadDone = true; break
      case 'blockquote': out.push(`<blockquote>${text}</blockquote>`); break
      default:
        out.push(leadDone ? `<p>${text}</p>` : `<p class="lead">${text}</p>`)
        leadDone = true
    }
  }
  closeList()
  return out.join('\n      ')
}

function wordCount(body: Block[] | undefined, faqs: Post['faqs']) {
  const t = (body ?? []).map((b) => (b.children ?? []).map((c) => c.text ?? '').join(' ')).join(' ')
  const f = (faqs ?? []).map((q) => `${q.question} ${q.answer}`).join(' ')
  return `${t} ${f}`.trim().split(/\s+/).filter(Boolean).length
}

function faqHtml(faqs: Post['faqs']): string {
  if (!faqs?.length) return ''
  return (
    `<h2>Frequently asked questions</h2>\n      <div class="faq">` +
    faqs.map((q, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join('') +
    `</div>`
  )
}

// ---------- likes + comments (same API + visitor id as the previous site) ----------
const HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>'
const BUBBLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z"/></svg>'

function interactions(slug: string): string {
  const s = JSON.stringify(slug).replace(/</g, '\\u003c')
  return `<section class="wrap"><div class="eng" id="comments">
    <div class="eng-bar">
      <div class="grp">
        <button type="button" class="eng-btn like" id="likeBtn" aria-pressed="false" aria-label="Like this post">${HEART}<span id="likeN">0</span></button>
        <a class="eng-btn" href="#cform" aria-label="Jump to comments">${BUBBLE}<span id="cntTop">0</span></a>
      </div>
      <span class="eng-note" id="likeNote">Enjoyed this? Let us know.</span>
    </div>
    <h2>Comments<small id="cntHead">(0)</small></h2>
    <form class="cform" id="cform" autocomplete="off">
      <input type="text" id="cName" placeholder="Your name" maxlength="80" required aria-label="Your name">
      <textarea id="cMsg" placeholder="Share your thoughts…" maxlength="1000" required aria-label="Your comment"></textarea>
      <div class="row"><span class="st" id="cSt">0/1000</span><button class="go" id="cGo" type="submit" disabled>Post comment</button></div>
    </form>
    <ul class="clist" id="cList"></ul>
    <p class="cempty" id="cEmpty" hidden>Be the first to comment.</p>
  </div></section>
<script>
(function(){
var slug=${s},K='naira-visitor-id',vid='';
try{vid=localStorage.getItem(K)||'';if(!vid){vid=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():'v-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);localStorage.setItem(K,vid)}}catch(e){vid=vid||'v-'+Date.now().toString(36)}
var $=function(i){return document.getElementById(i)};
var likeBtn=$('likeBtn'),likeN=$('likeN'),note=$('likeNote'),list=$('cList'),empty=$('cEmpty'),st=$('cSt'),go=$('cGo'),nm=$('cName'),ms=$('cMsg');
var liked=false,count=0,busy=false,comments=[];
function paintLike(){likeBtn.setAttribute('aria-pressed',String(liked));likeBtn.setAttribute('aria-label',liked?'Unlike this post':'Like this post');likeN.textContent=count;note.textContent=liked?'Thanks for the love':'Enjoyed this? Let us know.'}
function ago(s){var d=new Date(s),sec=Math.floor((Date.now()-d)/1000);if(sec<60)return'just now';var m=Math.floor(sec/60);if(m<60)return m+'m ago';var h=Math.floor(m/60);if(h<24)return h+'h ago';var dy=Math.floor(h/24);if(dy<7)return dy+'d ago';return d.toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'})}
function paintComments(){list.textContent='';comments.forEach(function(c){var li=document.createElement('li'),w=document.createElement('div'),av=document.createElement('span'),who=document.createElement('div'),b=document.createElement('b'),t=document.createElement('span'),p=document.createElement('p');
w.className='who';av.className='av';av.textContent=((c.name||'?').trim()[0])||'?';b.textContent=c.name||'';t.textContent=ago(c.createdAt);who.appendChild(b);who.appendChild(t);w.appendChild(av);w.appendChild(who);p.textContent=c.message||'';li.appendChild(w);li.appendChild(p);list.appendChild(li)});
empty.hidden=comments.length>0;$('cntTop').textContent=comments.length;$('cntHead').textContent='('+comments.length+')'}
function ready(){go.disabled=!(nm.value.trim()&&ms.value.trim())}
nm.addEventListener('input',ready);ms.addEventListener('input',function(){ready();st.className='st';st.textContent=ms.value.length+'/1000'});
fetch('/api/blog/like?slug='+encodeURIComponent(slug)+'&visitorId='+encodeURIComponent(vid)).then(function(r){return r.json()}).then(function(d){if(typeof d.count==='number')count=d.count;if(typeof d.liked==='boolean')liked=d.liked;paintLike()}).catch(function(){});
fetch('/api/blog/comments?slug='+encodeURIComponent(slug)).then(function(r){return r.json()}).then(function(d){if(Array.isArray(d.comments))comments=d.comments;paintComments()}).catch(function(){paintComments()});
likeBtn.addEventListener('click',function(){if(busy)return;busy=true;likeBtn.disabled=true;var pl=liked,pc=count;liked=!pl;count=pl?pc-1:pc+1;paintLike();
fetch('/api/blog/like',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:slug,visitorId:vid})}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(typeof d.count==='number')count=d.count;if(typeof d.liked==='boolean')liked=d.liked}).catch(function(){liked=pl;count=pc}).then(function(){busy=false;likeBtn.disabled=false;paintLike()})});
$('cform').addEventListener('submit',function(e){e.preventDefault();var n=nm.value.trim(),m=ms.value.trim();if(!n||!m||go.disabled)return;go.disabled=true;st.className='st';st.textContent='Posting…';
fetch('/api/blog/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:slug,name:n,message:m})}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(d&&d.comment)comments.unshift(d.comment);ms.value='';paintComments();st.className='st ok';st.textContent='Comment posted. Thanks!';setTimeout(function(){st.className='st';st.textContent='0/1000'},2500)}).catch(function(){st.className='st bad';st.textContent='Something went wrong. Try again.'}).then(function(){ready()})});
})();
</script>`
}

// ---------- post ----------
const TEAM_PHOTO: Record<string, string> = { 'ashay gohad': '/site/img/team-ashay.jpg' }

function avatar(post: Post, px: number, lazy: boolean): string {
  const name = post.author?.name ?? 'Naira Team'
  const sanity = post.author?.photo?.asset
    ? urlFor(post.author.photo).width(px * 2).height(px * 2).fit('crop').url()
    : null
  const src = sanity ?? TEAM_PHOTO[name.toLowerCase()]
  if (!src) return `<span class="av" aria-hidden="true" style="width:${px}px;height:${px}px;border-radius:50%;background:var(--blob);color:var(--pink-ink);display:grid;place-items:center;font-weight:800;flex:none">${esc(name[0])}</span>`
  return `<img src="${esc(src)}" alt="${lazy ? esc(name) : ''}" width="${px}" height="${px}"${lazy ? ' loading="lazy"' : ''} style="object-fit:cover;border-radius:50%">`
}

export async function renderPost(slug: string): Promise<Response> {
  const [post, all] = await Promise.all([getPostBySlug(slug), getPosts()])
  if (!post) {
    return html(
      `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Post not found | Naira Blog</title>` +
        `<body style="font-family:system-ui;text-align:center;padding:96px 20px"><h1>Post not found</h1><p><a href="/blog">← Back to all articles</a></p></body>`,
      404,
    )
  }

  const cat = categoryOf(post)
  const url = `${SITE}/blog/${post.slug.current}`
  const title = `${post.headline} | Naira Blog`
  const desc = post.excerpt ?? post.headline
  const hero = imgUrl(post, 1600, 900)
  const ogImg = imgUrl(post, 1200, 630)
  const name = post.author?.name ?? 'Naira Team'
  const mins = Math.max(1, Math.round(wordCount(post.body as unknown as Block[], post.faqs) / 200))
  const enc = encodeURIComponent

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.headline,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    ...(hero && { image: hero }),
    author: { '@type': 'Person', name },
    publisher: { '@type': 'Organization', name: 'Naira Menus', logo: { '@type': 'ImageObject', url: `${SITE}/icon.png` } },
  }
  const faq = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      }
    : null

  const head =
    `<link rel="canonical" href="${esc(url)}">` +
    `<meta property="og:type" content="article"><meta property="og:title" content="${esc(post.headline)}">` +
    `<meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(url)}">` +
    `<meta property="article:published_time" content="${esc(post.publishedAt)}">` +
    (ogImg ? `<meta property="og:image" content="${esc(ogImg)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">` : '') +
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(post.headline)}">` +
    `<meta name="twitter:description" content="${esc(desc)}">` +
    (ogImg ? `<meta name="twitter:image" content="${esc(ogImg)}">` : '') +
    jsonLd(article) + (faq ? jsonLd(faq) : '')

  const others = all.filter((p) => p.slug.current !== post.slug.current)
  const related = [...others.filter((p) => categoryOf(p) === cat), ...others.filter((p) => categoryOf(p) !== cat)].slice(0, 3)

  return html(
    fill(POST_TEMPLATE, {
      TITLE: esc(title),
      DESC: esc(desc),
      HEAD_EXTRA: head,
      CRUMBS: `<nav class="crumbs" aria-label="Breadcrumb"><a href="/blog">Blog</a> <span>›</span> <a href="/blog">${esc(CAT_LABEL[cat])}</a></nav>`,
      H1: esc(post.headline),
      DEK: post.excerpt ? `<p class="dek">${esc(post.excerpt)}</p>` : '',
      AUTHOR_IMG48: avatar(post, 48, false),
      AUTHOR_IMG72: avatar(post, 72, true),
      AUTHOR_NAME: esc(name),
      AUTHOR_ROLE: esc(post.author?.role ?? 'Writes about menus, billing and local search for restaurant owners.'),
      DATE_ISO: ist(post.publishedAt).iso,
      DATE_LONG: dateLong(post.publishedAt),
      READ: `${mins} min read`,
      WA_HREF: esc(`https://wa.me/?text=${enc(`${post.headline} ${url}`)}`),
      LI_HREF: esc(`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`),
      HERO: hero
        ? `<figure class="wrap post-hero"><div class="ph16"><img src="${esc(hero)}" alt="${esc(post.headerImage?.alt ?? post.headline)}" onerror="this.remove()"></div></figure>`
        : '',
      PROSE: prose(post.body as unknown as Block[]) + (faq ? '\n      ' + faqHtml(post.faqs) : ''),
      INTERACT: interactions(post.slug.current),
      MORE: related.map((p) => card(p, '')).join(''),
      URL: esc(url),
    }),
  )
}
