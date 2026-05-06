# 🚀 ARVUS Guide

## 1. Local Dev
```bash
npm install
npm run dev
```

**What it does:**
1. Authenticates with Vercel account
2. Creates/updates project
3. Builds and deploys automatically
4. Provides live URL

---

### **Option 2: GitHub Integration (Best for Teams)**
1. **Create a new repository** on GitHub at github.com/new named `arvus`. Keep it empty (do not add a README or License).
2. Push code from your terminal:
```bash
git init
git add .
git commit -m "Initial commit - ARVUS landing page"
git branch -M main
git remote add origin https://github.com/arunpratapsingh052-code/arvus.git
git push -u origin main
```

2. Go to **vercel.com** and:
   - Click "New Project"
   - Import your GitHub repo
   - Select framework: **Vite**
   - Vercel auto-detects config
   - Click Deploy!

---

### **Option 3: GitHub Actions (Automated)**
The project is configured with a GitHub Action in `.github/workflows/deploy.yml`.
1. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to your GitHub Repo Secrets.
2. Every push to `main` will now trigger an automatic production build and deployment.
3. **Preview Deployments**: Every Pull Request to `main` will trigger a Preview Deployment via `.github/workflows/preview.yml`. Vercel will comment on the PR with a unique preview URL.
4. Monitor progress in the **Actions** tab of your GitHub repository.
5. **Quality Gates**: Every Pull Request also triggers `.github/workflows/lint.yml` to ensure code follows ESLint and Prettier standards.

---

## 🔧 Configuration Details

### **vercel.json Settings:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### **Environment Variables (if needed):**
Go to Vercel Project → Settings → Environment Variables

---

## 📊 Build & Performance Metrics

**Current Build Stats:**
- HTML: 0.75 kB (gzip: 0.43 kB)
- CSS: 77.25 kB (gzip: 13.58 kB)
- JS: 485.59 kB (gzip: 153.74 kB)
- **Total Gzip: ~167 kB** ✓ Good

---

## ✨ Features Deployed:

✅ Premium design with glassmorphism
✅ Owner info: Arun Pratap Singh Chauhan
✅ About brand section
✅ FAQ section
✅ Contact section with email & social links
✅ Countdown timer (90 days launch)
✅ Early access email capture
✅ Responsive design
✅ Custom animations
✅ Gold & cyan color scheme
✅ Professional footer with links

---

## 🔗 Post-Deployment

After deployment, you can:
1. **Custom Domain**: 
   - **CLI**: Run `vercel domains add <domain-name>`
   - **Dashboard**: Settings → Domains → Add custom domain
   - Follow the DNS verification steps provided by Vercel.
2. **SSL/TLS**: Auto-enabled
3. **Analytics**: Vercel → Analytics tab
4. **Logs**: Vercel → Deployments → Logs
5. **Rollback**: One-click rollback to previous versions

---

## 📝 Next Steps for Feature Enhancement

- [ ] Product catalog page
- [ ] Shopping cart system
- [ ] User authentication
- [ ] Payment integration (Stripe)
- [ ] Blog section
- [ ] Image optimization
- [ ] SEO improvements

---

**Ready to deploy? Run:**
```bash
vercel --prod
```
