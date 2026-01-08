# Google OAuth Setup for Swagger API

## ✅ What I've Configured

Your Swagger UI can now handle Google OAuth authentication directly! The "Authorize" button will trigger the Google login flow automatically.

## 🔧 Configuration Changes Made

### 1. Backend Configuration
- ✅ Added `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to config
- ✅ Configured OAuth2 authorization code flow
- ✅ Added `/auth/google/login` endpoint (initiates OAuth)
- ✅ Added `/auth/google/callback` endpoint (handles Google redirect)
- ✅ Added `httpx` dependency for OAuth token exchange
- ✅ Configured Swagger UI with OAuth init parameters

### 2. OAuth Flow
```
User clicks "Authorize" in Swagger
    ↓
Redirects to /auth/google/login
    ↓
Redirects to Google Login
    ↓
User authenticates with Google
    ↓
Google redirects to /auth/google/callback
    ↓
Backend exchanges code for Google token
    ↓
Backend gets user info from Google
    ↓
Backend creates/finds user in database
    ↓
Backend returns JWT access_token
    ↓
Swagger stores token automatically
    ↓
All API calls now authenticated ✅
```

## 📋 Google Cloud Platform Setup

### Step 1: Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select/create your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**

### Step 2: Configure OAuth Consent Screen (if not done)

1. Click **Configure Consent Screen**
2. Choose **External**
3. Fill required fields:
   - App name: **LUGGAGE API**
   - User support email: Your email
   - Developer contact: Your email
4. Click **Save and Continue**
5. **Scopes**: Add `openid`, `email`, `profile`
6. **Test users**: Add your Gmail for testing
7. Save

### Step 3: Create OAuth Client

1. **Application type**: Web application
2. **Name**: LUGGAGE Backend API
3. **Authorized JavaScript origins**:
   ```
   http://localhost:8001
   ```
4. **Authorized redirect URIs** (CRITICAL - add both):
   ```
   http://localhost:8001/auth/google/callback
   http://localhost:8001/docs/oauth2-redirect
   ```
5. Click **Create**
6. **Copy Client ID and Client Secret**

### Step 4: Update .env File

Add these to your `/backend/.env`:

```bash
# Existing settings...
DATABASE_URL=postgresql://luggage_app:luggage_app_pass@db:5432/luggage_db
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Add these Google OAuth settings
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Step 5: Rebuild Backend

```bash
cd /home/phineasgroov/LUGGAGE_proj/LUGGAGE
docker-compose down
docker-compose build backend
docker-compose up -d
```

## 🧪 Testing in Swagger

### Method 1: Using Swagger UI Authorize Button (NEW!)

1. Open Swagger: `http://localhost:8001/docs`

2. Click the **Authorize** button (🔒 icon, top right)

3. You'll see two authentication options:
   - **OAuth2PasswordBearer** (for email/password login)
   - **Google OAuth** (new!)

4. For Google OAuth:
   - Click **Authorize** in the Google OAuth section
   - You'll be redirected to Google login
   - After authentication, you'll be redirected back
   - Swagger will automatically store your token

5. Now all API calls will include your JWT token!

### Method 2: Direct Flow (Manual)

If Swagger redirect doesn't work perfectly, you can still use:

```bash
# 1. Open in browser:
http://localhost:8001/auth/google/login

# 2. After Google authentication, copy the access_token from response

# 3. In Swagger, click Authorize and paste token manually
```

## 🔍 Verify Configuration

Check the backend logs after restart:

```bash
docker logs luggage-backend-1 | grep "Google OAuth"
```

Should show:
```
Google OAuth configured: True
```

## 🎯 Expected Behavior

### When properly configured:

1. **Swagger `/docs` page loads** ✅
2. **Authorize button shows Google OAuth option** ✅
3. **Clicking Authorize → redirects to Google** ✅
4. **After login → redirects back with token** ✅
5. **Token automatically used in API calls** ✅

### If it doesn't work:

Check these common issues:

#### Issue: "Redirect URI mismatch"
**Solution:**
- Verify in Google Cloud Console, Authorized redirect URIs include:
  ```
  http://localhost:8001/auth/google/callback
  http://localhost:8001/docs/oauth2-redirect
  ```
- URIs must match EXACTLY (including http vs https, port number)

#### Issue: "Client ID not found"
**Solution:**
- Verify `.env` has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Restart backend: `docker-compose restart backend`
- Check logs: `docker logs luggage-backend-1`

#### Issue: "Access blocked: This app's request is invalid"
**Solution:**
- Go to OAuth consent screen in Google Cloud Console
- Add your email to "Test users"
- Make sure app status is "Testing" not "Production"

#### Issue: Token not automatically stored in Swagger
**Solution:**
- Use Method 2 (manual token entry)
- Or check browser console for JavaScript errors

## 📱 Testing the Flow

### Test 1: Direct API Call
```bash
# Get authorization URL
curl http://localhost:8001/auth/google/login
# Copy URL and open in browser, then complete flow
```

### Test 2: Check User Creation
```bash
# After OAuth login, check user was created
docker exec luggage-db-1 psql -U luggage_app -d luggage_db -c "SELECT id, email, is_admin FROM users;"
```

### Test 3: Use Token
```bash
# After getting token from OAuth
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:8001/users/me
```

## 🔒 Security Notes

1. **Client Secret**: Never commit to git (already in .gitignore)
2. **Redirect URIs**: Only add trusted domains
3. **Scopes**: Only request what you need (openid, email, profile)
4. **HTTPS**: For production, use HTTPS only
5. **Token Storage**: Swagger stores in browser session only

## 🚀 Production Deployment

When deploying to production:

1. Update redirect URIs in Google Cloud Console:
   ```
   https://yourdomain.com/auth/google/callback
   https://yourdomain.com/docs/oauth2-redirect
   ```

2. Update `.env` with production domain

3. Change OAuth consent screen to "Production" status

4. Remove test users limit

## 📞 Support

If you encounter issues:
1. Check backend logs: `docker logs luggage-backend-1`
2. Check browser console (F12) for JavaScript errors
3. Verify Google Cloud Console configuration
4. Test with `curl` to isolate Swagger UI issues

---

**You're all set!** 🎉 After adding your Google credentials to `.env` and rebuilding, Swagger will handle OAuth automatically.
