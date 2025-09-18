# Voice Transcription API

A production-ready Node.js API server for voice transcription using AssemblyAI, designed for the Voice Keyboard Android app.

## Features

- 🎤 **Audio transcription** using AssemblyAI
- 🚀 **Railway deployment** ready
- 🔒 **Security** with rate limiting, CORS, and helmet
- 📁 **File upload** support for various audio formats
- ⚡ **Fast processing** with optimized AssemblyAI settings
- 🔍 **Health monitoring** with detailed health checks
- 📊 **Comprehensive logging** for debugging and monitoring

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd voice-transcription-api
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your AssemblyAI API key:

```env
ASSEMBLYAI_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Get AssemblyAI API Key

1. Sign up at [AssemblyAI](https://www.assemblyai.com/)
2. Navigate to your dashboard
3. Copy your API key
4. Add it to your `.env` file

### 4. Local Development

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "uptime": 3600.123,
  "version": "1.0.0"
}
```

### Transcribe Audio
```
POST /api/transcribe
Content-Type: multipart/form-data
```

Parameters:
- `audio` (file): Audio file (M4A, MP3, WAV, WEBM, OGG)
- Max file size: 10MB

Response:
```json
{
  "text": "This is the transcribed text from your audio",
  "confidence": 0.95,
  "processingTime": 1500
}
```

### API Info
```
GET /api
```

Shows available endpoints and API information.

## Railway Deployment

### Automatic Deployment

1. **Connect GitHub Repository**
   - Sign up at [Railway](https://railway.app/)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Environment Variables**
   - Go to your project settings
   - Add environment variables:
     ```
     ASSEMBLYAI_API_KEY=your_api_key_here
     NODE_ENV=production
     ```

3. **Deploy**
   - Railway will auto-detect and deploy your Node.js app
   - Your API will be live at `https://your-app.railway.app`

### Manual Railway CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

## Android Integration

Update your Android app's API client URL to your Railway deployment:

```kotlin
// In VoiceApiClient.kt
private const val BASE_URL = "https://your-app.railway.app/api/"
```

## Production Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ASSEMBLYAI_API_KEY` | AssemblyAI API key | ✅ Yes | - |
| `PORT` | Server port | ❌ No | 3000 |
| `NODE_ENV` | Environment | ❌ No | development |

### Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable origins for production
- **Helmet**: Security headers
- **File Validation**: Type and size limits
- **Error Handling**: Comprehensive error responses

## File Upload Specifications

### Supported Formats
- Audio MP4 (M4A)
- MP3
- WAV
- WebM
- OGG

### Limits
- **File Size**: 10MB maximum
- **File Count**: 1 file per request
- **Field Name**: Must be `audio`

## Error Handling

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `MISSING_FILE` | 400 | No audio file provided |
| `FILE_TOO_LARGE` | 400 | File exceeds 10MB limit |
| `INVALID_FILE_TYPE` | 400 | Unsupported audio format |
| `TRANSCRIPTION_ERROR` | 422 | AssemblyAI transcription failed |
| `RATE_LIMIT` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

### Example Error Response

```json
{
  "error": "File size too large. Maximum size is 10MB.",
  "code": "FILE_TOO_LARGE"
}
```

## Development

### Local Testing

Test the transcription endpoint:

```bash
curl -X POST http://localhost:3000/api/transcribe \
  -F "audio=@test-audio.m4a"
```

### Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start with nodemon for development

## Monitoring

### Health Check

Monitor your deployment:

```bash
curl https://your-app.railway.app/health
```

### Logs

View logs in Railway dashboard or via CLI:

```bash
railway logs
```

## Performance Optimization

### AssemblyAI Settings

The API is optimized for voice keyboard use:

- **Punctuation**: Enabled for proper formatting
- **Disfluencies**: Disabled (removes "um", "uh")
- **Language Detection**: Automatic with confidence threshold
- **Format Text**: Enabled for clean output

### Caching Considerations

For high-traffic deployments, consider:

- Redis caching for repeated audio files
- CDN for static assets
- Load balancing for multiple instances

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check your `ASSEMBLYAI_API_KEY` is correct
   - Verify the key has transcription permissions

2. **"File upload failed"**
   - Ensure file is under 10MB
   - Check file format is supported
   - Verify field name is `audio`

3. **"Transcription timeout"**
   - Check your internet connection
   - Verify AssemblyAI service status
   - Try with a shorter audio file

### Debug Mode

Enable detailed logging:

```env
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- Check the troubleshooting section
- Review Railway deployment logs
- Open an issue in the repository