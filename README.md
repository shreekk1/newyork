# My World — Personal Vlog Website
### Nepal → New York → Everywhere in Between

A complete, responsive, production-ready personal vlog website built with clean HTML, CSS, and JavaScript. No frameworks, no dependencies — just fast, secure, accessible code.

---

## 📁 Project Structure

```
myvlog/
│
├── index.html              ← Homepage
│
├── pages/
│   ├── about.html          ← About me page
│   ├── gallery.html        ← Photo gallery with filter + lightbox
│   ├── blog.html           ← Stories / blog posts
│   ├── contact.html        ← Contact form
│   └── privacy.html        ← Privacy policy
│
├── css/
│   ├── main.css            ← Shared styles (nav, footer, themes, buttons)
│   └── home.css            ← Homepage-only styles
│   └── pages.css           ← Inner page styles (about, gallery, blog, contact)
│
├── js/
│   └── main.js             ← All JavaScript (theme, nav, form, lightbox, gallery)
│
├── images/
│   └── .gitkeep            ← Keeps folder in git. Replace with your photos.
│
├── _headers                ← Netlify security headers (CSP, X-Frame, etc.)
├── _redirects              ← Netlify URL redirects
├── sitemap.xml             ← SEO sitemap for search engines
├── robots.txt              ← Search engine crawl instructions
├── .gitignore              ← Files git should ignore
├── .env.example            ← Template for environment variables
└── README.md               ← This file
```

---

## 🚀 Quick Start (Run Locally in VS Code)

### Step 1 — Open in VS Code
```bash
# Option A: drag the myvlog folder onto VS Code
# Option B: open terminal and type:
code /path/to/myvlog
```

### Step 2 — Install Live Server extension
1. In VS Code, press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
2. Search for **"Live Server"** by Ritwick Dey
3. Click **Install**

### Step 3 — Run the site
1. Right-click on `index.html` in the file explorer
2. Click **"Open with Live Server"**
3. Your browser opens at `http://127.0.0.1:5500`

> ✅ That's it! The site updates live as you edit files.

---

## 🖼️ Adding Your Photos

All photos go in the **`/images/`** folder.

### Which photos to add:

| Filename | Where it appears |
|---|---|
| `hero.jpg` | Homepage hero (right side) — use portrait photo |
| `chapter-roots.jpg` | "Roots — Nepal" chapter card |
| `chapter-love.jpg` | "Love & Adventure" chapter card |
| `chapter-nyc.jpg` | "New York City" chapter card |
| `chapter-nature.jpg` | "Wild Adventures" chapter card |
| `about-main.jpg` | About page portrait |
| `story-1.jpg` | Homepage latest stories — card 1 |
| `story-2.jpg` | Homepage latest stories — card 2 |
| `story-3.jpg` | Homepage latest stories — card 3 |
| `story-holi.jpg` | Blog post: Holi |
| `story-lake.jpg` | Blog post: Lake George |
| `story-cherry.jpg` | Blog post: Cherry blossoms |
| `story-roots.jpg` | Blog post: Nepal roots |
| `story-love.jpg` | Blog post: Love |
| `story-hudson.jpg` | Blog post: Hudson Highlands |
| `story-nyc.jpg` | Blog post: NYC chapter |
| `gallery-1.jpg` through `gallery-12.jpg` | Gallery page |
| `strip-1.jpg` through `strip-8.jpg` | Scrollable photo strip |

### Tips for photos:
- **Resize before uploading** — keep images under 500KB each for fast loading
- Free tool to resize: [Squoosh](https://squoosh.app) (drag photo in, download compressed)
- Hero image: portrait orientation (tall) works best
- Gallery images: any size/orientation — the masonry grid handles it

---

## ✉️ Making the Contact Form Work

The contact form needs a free **Formspree** account to receive emails.

### Steps:
1. Go to [https://formspree.io](https://formspree.io) → Sign up free
2. Click **"New Form"** → give it a name
3. Copy your form ID — it looks like `xpzgwqkr`
4. Open `js/main.js`
5. Find this line (around line 170):
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. Replace `YOUR_FORM_ID` with your actual ID:
   ```javascript
   fetch('https://formspree.io/f/xpzgwqkr', {
   ```
7. Save the file — the form now emails you every submission ✅

> **Netlify alternative:** If you deploy to Netlify, add `data-netlify="true"` to the `<form>` tag in `pages/contact.html`. Netlify handles submissions automatically — no Formspree needed.

---

## 🎨 Customising Content

### Change your name / website title
Search for `"My World"` in all HTML files and replace with your name.

### Change social media links
In each HTML file, find the footer section and update the `href="#"` with your real URLs:
```html
<li><a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
<li><a href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer">YouTube ↗</a></li>
```

### Add a new blog post
Open `pages/blog.html`, copy one `<article class="blog-post">` block,
paste it after the last post, and update the text, image, and date.

### Add a new gallery photo
Open `pages/gallery.html`, copy one `<div class="gallery-item">` block,
paste it in the gallery grid, update `src`, `alt`, and `data-category`.

### Change colors / theme
Open `css/main.css` — find the `:root [data-theme="light"]` and `[data-theme="dark"]` sections.
Change the color values (e.g. `--amber: #c07828`) to match your brand.

---

## 📤 Uploading to GitHub

### First time setup:

```bash
# 1. Install Git if you haven't: https://git-scm.com/downloads

# 2. Open terminal in the myvlog folder
cd path/to/myvlog

# 3. Initialise git
git init

# 4. Add all files
git add .

# 5. Make your first commit
git commit -m "Initial commit — My World vlog"

# 6. Create a new repository on GitHub.com
#    Go to github.com → New repository → name it "myvlog" → Create

# 7. Connect your local folder to GitHub
git remote add origin https://github.com/YOURUSERNAME/myvlog.git
git branch -M main
git push -u origin main
```

### Updating later (after you make changes):
```bash
git add .
git commit -m "Add new photos and blog post"
git push
```

---

## 🌐 Deploying (Making It Live)

### Option A — GitHub Pages (Free, easiest)
1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source": select **main branch**, folder **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes
6. Your site is live at: `https://YOURUSERNAME.github.io/myvlog/`

> ⚠️ GitHub Pages doesn't support the `_headers` file.
> Security headers work on Netlify — see below for better security.

### Option B — Netlify (Free, better security headers)
1. Go to [https://netlify.com](https://netlify.com) → Sign up free
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub → select your `myvlog` repository
4. Leave all settings as default → click **"Deploy site"**
5. Done! Netlify gives you a URL like `https://myworld.netlify.app`

> ✅ Netlify reads the `_headers` file automatically — full security headers enabled.

### Option C — Vercel (Free, fast)
1. Go to [https://vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"** → select your `myvlog` repository
3. Click **Deploy**
4. Your site is live at `https://myvlog.vercel.app`

---

## 🔒 Security Checklist

| Item | Status |
|---|---|
| ✅ No API keys or passwords in code | All secrets in `.env` (gitignored) |
| ✅ Form input validation | Client-side: type, length, email format |
| ✅ Form input sanitisation | HTML tags stripped before sending |
| ✅ Honeypot spam protection | Hidden field catches bot submissions |
| ✅ XSS prevention | `escapeHtml()` on all user input |
| ✅ Safe error messages | Generic errors only — no server details exposed |
| ✅ External links secured | All use `rel="noopener noreferrer"` |
| ✅ Security HTTP headers | Via `_headers` file (active on Netlify) |
| ✅ No sensitive data in localStorage | Only theme preference stored |
| ✅ HTTPS enforced | Automatic on GitHub Pages, Netlify, Vercel |
| ✅ Content Security Policy | Defined in `_headers` |
| ✅ No tracking or ads | Zero third-party trackers by default |

---

## ♿ Accessibility Features

- Skip-to-content link for keyboard users
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`, `<time>`, etc.)
- ARIA labels on all interactive elements
- Keyboard-navigable gallery strip (arrow keys)
- Keyboard-navigable lightbox (arrow keys, Escape to close)
- `prefers-reduced-motion` support — animations disabled if user prefers
- Focus-visible outlines for keyboard navigation
- High contrast ratios in both light and dark themes
- `alt` text on all images
- `aria-current="page"` on active nav links

---

## 🛠️ Updating Your Website Later

**To add a new photo to the gallery:**
1. Add photo to `/images/` folder
2. Open `pages/gallery.html`
3. Copy a `<div class="gallery-item">` block and update src/alt/category

**To write a new blog post:**
1. Open `pages/blog.html`
2. Copy one `<article class="blog-post">` block
3. Paste it at the top of the list and update title, text, image, date

**To change the homepage hero photo:**
1. Add your photo to `/images/` as `hero.jpg`

**To update your bio on the About page:**
1. Open `pages/about.html`
2. Find the paragraphs inside `.about-text` and edit the text

**To deploy your changes:**
```bash
git add .
git commit -m "Update: describe what you changed"
git push
```
The live site updates automatically within ~1 minute.

---

## 📞 Need Help?

If something breaks, check:
1. **Console errors** — open browser DevTools (`F12`) → Console tab
2. **File paths** — make sure image filenames match exactly (case-sensitive)
3. **Live Server** — make sure it's running in VS Code

---

*Built with ❤️ — A life lived in colour, love & curiosity ✦*
