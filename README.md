# Vuselelwa IT — Website

South Africa's IT Renewal Company website.

## Deploying to GitHub Pages

1. **Create a GitHub repository** named `vuselelwa-site` (or any name you prefer).

2. **Upload all files** maintaining this folder structure:
   ```
   index.html
   assets/
     css/
       style.css
     js/
       main.js
   README.md
   ```

3. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Under "Source", select `main` branch and `/ (root)` folder
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/vuselelwa-site/`

4. **Custom domain (vuselelwa.co.za):**
   - In Settings → Pages → Custom domain, enter `vuselelwa.co.za`
   - At your domain registrar (afrihost, Domains.co.za, etc), add these DNS records:
     ```
     Type: A     Name: @    Value: 185.199.108.153
     Type: A     Name: @    Value: 185.199.109.153
     Type: A     Name: @    Value: 185.199.110.153
     Type: A     Name: @    Value: 185.199.111.153
     Type: CNAME Name: www  Value: yourusername.github.io
     ```
   - Tick "Enforce HTTPS" once DNS propagates (24–48 hours)

## Setting up the Contact Form (Formspree)

The form sends to `info@vuselelwa.co.za`. To activate:

1. Go to **https://formspree.io** and sign up for free
2. Create a new form pointing to `info@vuselelwa.co.za`
3. Copy your Form ID (looks like `xpzvwkab`)
4. Open `assets/js/main.js` and replace:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/info@vuselelwa.co.za';
   ```
   with:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

Until Formspree is configured, the form automatically falls back to opening the user's email client (mailto) addressed to info@vuselelwa.co.za — so enquiries still come through.

## Technologies Used

- Pure HTML5, CSS3, Vanilla JavaScript — no frameworks required
- Google Fonts: Barlow Condensed + Barlow
- No server required — fully static, works on GitHub Pages
- Mobile responsive — tested down to 320px

## Brand Colours

| Name         | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| Navy         | #0a1628   | Primary background        |
| Blue         | #1565d8   | Primary accent            |
| Blue Bright  | #2979ff   | Hover states, highlights  |
| Cyan         | #00b4d8   | Section labels, icons     |
| Gold         | #f4c430   | Accent details, rules     |
| Muted        | #8ea4c8   | Body text, descriptions   |

---
© 2026 Vuselelwa (Pty) Ltd, South Africa
