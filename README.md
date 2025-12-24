# Christmas Tree Sync Server

This is a simple Socket.IO server for real-time decoration synchronization.

## Quick Deploy (Choose One):

### Option 1: Glitch.com (Easiest - 2 minutes)
1. Go to https://glitch.com/
2. Click "New Project" → "Import from GitHub"
3. Upload the `server` folder
4. Your server will be live at `https://your-project-name.glitch.me`
5. Update `TreeScene.tsx` line 50 with your Glitch URL

### Option 2: Render.com (Free tier)
1. Go to https://render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Set:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
5. Deploy! Your URL will be `https://your-app.onrender.com`

### Option 3: Railway.app (Free tier)
1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub repo"
3. Select the `server` folder
4. Deploy automatically!

### Option 4: Run Locally (For Testing)
```bash
cd server
npm install
npm start
```
Server will run on `http://localhost:3001`

Then update `TreeScene.tsx` line 50:
```typescript
const socket = io('http://localhost:3001', {
```

## After Deployment:
Update the Socket.IO connection URL in `src/components/TreeScene.tsx` (line ~50):
```typescript
const socket = io('YOUR_DEPLOYED_URL_HERE', {
  transports: ['websocket', 'polling'],
});
```

That's it! Your Christmas tree will now sync across all devices! 🎄✨
