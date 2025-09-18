const axios = require('axios');

class TranscriptionService {
  constructor() {
    this.assemblyAI = axios.create({
      baseURL: 'https://api.assemblyai.com/v2',
      headers: {
        'Authorization': process.env.ASSEMBLYAI_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    this.uploadClient = axios.create({
      headers: {
        'Authorization': process.env.ASSEMBLYAI_API_KEY
      }
    });
  }

  async transcribeAudio(file) {
    try {
      console.log('Starting transcription process...');
      
      // Step 1: Upload audio file to AssemblyAI
      const uploadUrl = await this.uploadFile(file);
      console.log('File uploaded successfully:', uploadUrl);

      // Step 2: Submit transcription request
      const transcriptId = await this.submitTranscription(uploadUrl);
      console.log('Transcription submitted with ID:', transcriptId);

      // Step 3: Poll for completion
      const result = await this.pollForCompletion(transcriptId);
      console.log('Transcription completed');

      return {
        text: result.text,
        confidence: result.confidence,
        words: result.words || []
      };

    } catch (error) {
      console.error('Transcription service error:', error.response?.data || error.message);
      throw new Error(`Transcription failed: ${error.response?.data?.error || error.message}`);
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.uploadClient.post(
        'https://api.assemblyai.com/v2/upload',
        file.buffer,
        {
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        }
      );

      if (!response.data.upload_url) {
        throw new Error('Failed to get upload URL from AssemblyAI');
      }

      return response.data.upload_url;

    } catch (error) {
      console.error('File upload error:', error.response?.data || error.message);
      throw new Error(`File upload failed: ${error.response?.data?.error || error.message}`);
    }
  }

  async submitTranscription(audioUrl) {
    try {
      const transcriptionConfig = {
        audio_url: audioUrl,
        // Force English language instead of auto-detection
        language_code: 'en',
        // Optimization settings for voice keyboard use case
        punctuate: true,
        format_text: true,
        disfluencies: false, // Remove "um", "uh", etc.
        dual_channel: false,
        speaker_labels: false,
        // Speed up processing
        boost_param: 'default'
      };

      const response = await this.assemblyAI.post('/transcript', transcriptionConfig);

      if (!response.data.id) {
        throw new Error('Failed to get transcript ID from AssemblyAI');
      }

      return response.data.id;

    } catch (error) {
      console.error('Transcription submission error:', error.response?.data || error.message);
      throw new Error(`Transcription submission failed: ${error.response?.data?.error || error.message}`);
    }
  }

  async pollForCompletion(transcriptId, maxAttempts = 60, intervalMs = 1000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await this.assemblyAI.get(`/transcript/${transcriptId}`);
        const status = response.data.status;

        console.log(`Polling attempt ${attempt + 1}: Status = ${status}`);

        switch (status) {
          case 'completed':
            return {
              text: response.data.text,
              confidence: response.data.confidence,
              words: response.data.words
            };

          case 'error':
            throw new Error(`Transcription failed: ${response.data.error}`);

          case 'queued':
          case 'processing':
            // Continue polling
            await this.sleep(intervalMs);
            break;

          default:
            throw new Error(`Unknown transcription status: ${status}`);
        }

      } catch (error) {
        if (error.response?.status === 404) {
          throw new Error('Transcript not found');
        }
        console.error(`Polling error on attempt ${attempt + 1}:`, error.message);
        
        if (attempt === maxAttempts - 1) {
          throw new Error('Transcription polling timeout');
        }
        
        await this.sleep(intervalMs);
      }
    }

    throw new Error('Transcription timeout - exceeded maximum polling attempts');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Health check for the service
  async healthCheck() {
    try {
      // Test API key validity with a simple request
      await this.assemblyAI.get('/transcript', {
        params: { limit: 1 }
      });
      return { status: 'healthy', service: 'AssemblyAI' };
    } catch (error) {
      return { 
        status: 'unhealthy', 
        service: 'AssemblyAI',
        error: error.response?.data?.error || error.message 
      };
    }
  }
}

module.exports = new TranscriptionService();