# 🚀 Complete GitHub & Railway Deployment Guide

This guide will walk you through deploying your Voice Transcription API to Railway via GitHub, step by step. Perfect for beginners who have never used GitHub or Railway before.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ The voice-transcription-api project folder on your computer
- ✅ Terminal/Command Prompt access
- ✅ Internet connection
- ✅ A web browser

---

## 🔧 Step 1: Initialize Git Repository

### 1.1 Open Terminal/Command Prompt

**On Mac:**
- Press `Cmd + Space`, type "Terminal", press Enter

**On Windows:**
- Press `Windows + R`, type "cmd", press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### 1.2 Navigate to Your Project

```bash
# Replace with your actual path
cd /Users/siddhesh/Documents/Keyboard/voice-transcription-api
```

**⚠️ Important:** Make sure you're in the folder that contains `package.json` and `src/` folder.

### 1.3 Verify You're in the Right Place

```bash
# This should show package.json, src/, README.md, etc.
ls
```

**Expected output:**
```
README.md  package.json  railway.json  src/  .env.example  .gitignore  nixpacks.toml
```

### 1.4 Initialize Git

```bash
# Initialize a new Git repository
git init
```

**Expected output:**
```
Initialized empty Git repository in /Users/siddhesh/Documents/Keyboard/voice-transcription-api/.git/
```

### 1.5 Configure Git (First Time Only)

**If you've never used Git before:**

```bash
# Replace with your actual name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 1.6 Stage All Files

```bash
# Add all files to staging area
git add .
```

### 1.7 Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: Voice Transcription API"
```

**Expected output:**
```
[main (root-commit) a1b2c3d] Initial commit: Voice Transcription API
 12 files changed, 450 insertions(+)
 create mode 100644 README.md
 create mode 100644 package.json
 ...
```

✅ **Checkpoint:** Your local Git repository is now ready!

---

## 🌐 Step 2: Create GitHub Repository

### 2.1 Go to GitHub

1. Open your web browser
2. Go to [github.com](https://github.com)
3. **If you don't have an account:** Click "Sign up" and create one
4. **If you have an account:** Click "Sign in"

### 2.2 Create New Repository

1. **After logging in,** look for the green "New" button (top-left area)
2. **Click "New"** or **click the "+" icon** in the top-right corner
3. **Select "New repository"**

### 2.3 Repository Settings

**Fill out the form:**

1. **Repository name:** `voice-transcription-api`
   - ✅ Use lowercase letters, numbers, and hyphens only
   - ❌ No spaces or special characters

2. **Description:** `Voice transcription API using AssemblyAI for Android keyboard`

3. **Visibility:**
   - ✅ **Public** (recommended) - free and others can see it
   - ❌ **Private** - requires paid plan for some features

4. **Initialize options:**
   - ❌ **Do NOT check** "Add a README file"
   - ❌ **Do NOT check** "Add .gitignore"
   - ❌ **Do NOT check** "Choose a license"
   
   **Why?** We already have these files in our project.

5. **Click "Create repository"**

### 2.4 Copy Repository URL

After creating the repository, you'll see a page with setup instructions.

**Look for the HTTPS URL that looks like:**
```
https://github.com/YOUR_USERNAME/voice-transcription-api.git
```

**Copy this URL** - you'll need it in the next step.

✅ **Checkpoint:** Your GitHub repository is created and ready!

---

## 🔗 Step 3: Connect Local Repository to GitHub

### 3.1 Add Remote Origin

**In your terminal (still in the project folder):**

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/voice-transcription-api.git
```

**Example:**
```bash
git remote add origin https://github.com/johnsmith/voice-transcription-api.git
```

### 3.2 Set Default Branch

```bash
# Set main branch as default
git branch -M main
```

### 3.3 Push to GitHub

```bash
# Push your code to GitHub
git push -u origin main
```

**What happens:**
- Git will ask for your GitHub username and password/token
- **If using 2FA:** You need a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

**Expected output:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (12/12), done.
Writing objects: 100% (15/15), 8.45 KiB | 4.22 MiB/s, done.
Total 15 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR_USERNAME/voice-transcription-api.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### 3.4 Verify Upload

1. **Go back to your GitHub repository page**
2. **Refresh the page**
3. **You should see all your files:** package.json, README.md, src folder, etc.

✅ **Checkpoint:** Your code is now on GitHub!

---

## 🚂 Step 4: Deploy to Railway

### 4.1 Sign Up for Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "Start a New Project"** or **"Get Started"**
3. **Choose "Login with GitHub"** (recommended)
4. **Authorize Railway** to access your GitHub account
5. **Complete your Railway profile** if prompted

### 4.2 Create New Project

1. **After logging in,** click **"New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository:** `voice-transcription-api`
4. **Click "Deploy Now"**

**Railway will automatically:**
- ✅ Detect it's a Node.js project
- ✅ Install dependencies
- ✅ Start the deployment process

### 4.3 Add Environment Variables

**IMPORTANT:** Your app needs the AssemblyAI API key to work.

1. **In your Railway project dashboard,** look for **"Variables"** tab
2. **Click "Variables"**
3. **Click "New Variable"**
4. **Add:**
   - **Name:** `ASSEMBLYAI_API_KEY`
   - **Value:** `your_actual_assemblyai_api_key_here`
5. **Click "Add"**

### 4.4 Get Your AssemblyAI API Key

**If you don't have one:**

1. **Go to [assemblyai.com](https://www.assemblyai.com)**
2. **Click "Get API Key" or "Sign Up"**
3. **Create account and verify email**
4. **Go to your dashboard**
5. **Copy your API key**
6. **Add it to Railway variables** (step 4.3)

### 4.5 Monitor Deployment

**In Railway dashboard:**

1. **Click "Deployments" tab**
2. **Watch the build logs** - you'll see:
   ```
   ===== BUILD =====
   npm install
   ===== DEPLOY =====
   npm start
   ```
3. **Wait for "SUCCESS"** status (usually 2-3 minutes)

✅ **Checkpoint:** Your API is deployed and running!

---

## 🌍 Step 5: Get Your Deployment URL

### 5.1 Find Your App URL

**In Railway dashboard:**

1. **Look for "Domains" tab** or **"Settings"**
2. **You'll see an auto-generated URL like:**
   ```
   https://voice-transcription-api-production-a1b2.up.railway.app
   ```
3. **Copy this URL** - this is your live API!

### 5.2 Test Health Endpoint

**Open terminal and test:**

```bash
# Replace with your actual Railway URL
curl https://your-app-name.up.railway.app/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2023-12-01T10:30:00.000Z",
  "uptime": 45.123,
  "version": "1.0.0"
}
```

### 5.3 Test in Browser

1. **Open browser**
2. **Go to:** `https://your-app-name.up.railway.app/health`
3. **You should see the JSON response**

✅ **Checkpoint:** Your API is live and working!

---

## 📱 Step 6: Update Android App

### 6.1 Update API URL

**In your Android project:**

1. **Open:** `app/src/main/java/com/voicekeyboard/app/VoiceApiClient.kt`
2. **Find line 15:**
   ```kotlin
   private const val BASE_URL = "https://your-backend-url.com/api/"
   ```
3. **Replace with your Railway URL:**
   ```kotlin
   private const val BASE_URL = "https://your-app-name.up.railway.app/api/"
   ```

### 6.2 Test Full Integration

1. **Build and install your Android app**
2. **Enable the voice keyboard**
3. **Test voice transcription**
4. **Check Railway logs** for incoming requests

---

## 🔍 Step 7: Monitoring & Verification

### 7.1 Railway Dashboard Monitoring

**In Railway dashboard:**

1. **"Metrics" tab:** CPU, RAM, network usage
2. **"Logs" tab:** Real-time application logs
3. **"Deployments" tab:** Build history and status

### 7.2 Test API Endpoints

**Health check:**
```bash
curl https://your-app.up.railway.app/health
```

**API info:**
```bash
curl https://your-app.up.railway.app/api
```

**Test transcription (with audio file):**
```bash
curl -X POST https://your-app.up.railway.app/api/transcribe \
  -F "audio=@test-audio.m4a"
```

---

## 🚨 Troubleshooting Guide

### Problem 1: "Permission denied (publickey)"

**Symptoms:** Can't push to GitHub
```
git@github.com: Permission denied (publickey).
```

**Solution:**
```bash
# Use HTTPS instead of SSH
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/voice-transcription-api.git
git push -u origin main
```

### Problem 2: Railway Build Failed

**Symptoms:** Deployment shows "FAILED" status

**Check:**
1. **Go to "Deployments" tab**
2. **Click on failed deployment**
3. **Read the error logs**

**Common fixes:**
- **Missing package.json:** Make sure it's in root folder
- **Wrong Node version:** Update `engines` in package.json
- **Missing dependencies:** Run `npm install` locally first

### Problem 3: "Internal Server Error"

**Symptoms:** API returns 500 errors

**Check:**
1. **Railway "Logs" tab** for error details
2. **Environment variables** - is `ASSEMBLYAI_API_KEY` set?
3. **AssemblyAI API key** - is it valid?

**Fix:**
```bash
# Test your API key
curl -H "Authorization: YOUR_API_KEY" \
  https://api.assemblyai.com/v2/transcript
```

### Problem 4: Can't Access Deployment URL

**Symptoms:** URL doesn't load or shows Railway error page

**Check:**
1. **Deployment status:** Should show "SUCCESS"
2. **Application logs:** Look for startup errors
3. **Port configuration:** Railway auto-assigns PORT

**Verify:**
```bash
# Check if service is responding
curl -I https://your-app.up.railway.app/health
```

### Problem 5: GitHub Repository Not Found

**Symptoms:** Railway can't find your repo

**Fix:**
1. **Make sure repository is public**
2. **Check Railway GitHub permissions**
3. **Re-authorize Railway access to GitHub**

### Problem 6: Android App Can't Connect

**Symptoms:** Keyboard shows connection errors

**Check:**
1. **API URL in Android app** - correct Railway URL?
2. **Network connectivity** - can phone reach internet?
3. **API logs** - any requests coming through?

**Test:**
```bash
# Test from same network as phone
curl https://your-app.up.railway.app/api
```

---

## 📊 Monitoring Your Deployment

### Railway Logs

**Real-time monitoring:**
1. **Railway dashboard → "Logs" tab**
2. **Watch for:**
   - Server startup messages
   - API requests
   - Error messages
   - Performance metrics

### Health Checks

**Set up monitoring:**
```bash
# Create a simple health check script
curl -f https://your-app.up.railway.app/health || echo "API DOWN!"
```

### Usage Analytics

**Track API usage:**
- **Railway Metrics:** Request count, response times
- **AssemblyAI Dashboard:** Transcription usage and costs
- **Application logs:** Custom analytics

---

## 🎉 Success Checklist

- ✅ Git repository initialized and committed
- ✅ GitHub repository created and code pushed
- ✅ Railway project deployed successfully
- ✅ Environment variables configured
- ✅ Health endpoint responding
- ✅ Android app updated with Railway URL
- ✅ End-to-end voice transcription working

## 🆘 Need Help?

**If you're still stuck:**

1. **Check Railway's status page:** [status.railway.app](https://status.railway.app)
2. **GitHub's status page:** [githubstatus.com](https://githubstatus.com)
3. **Review this guide step-by-step**
4. **Check Railway documentation:** [docs.railway.app](https://docs.railway.app)

**Common commands for updates:**

```bash
# Update your deployed code
git add .
git commit -m "Update API"
git push origin main
# Railway will auto-deploy the changes
```

---

## 🔐 Security Notes

- ✅ **Never commit .env files** to GitHub
- ✅ **Use environment variables** for API keys
- ✅ **Keep AssemblyAI key private**
- ✅ **Monitor Railway usage** to avoid unexpected charges
- ✅ **Regularly update dependencies**

**Your API is now live and ready for production use!** 🚀