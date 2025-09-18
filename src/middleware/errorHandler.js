const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'File size too large. Maximum size is 10MB.',
      code: 'FILE_TOO_LARGE'
    });
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      error: 'Too many files. Only one file allowed.',
      code: 'TOO_MANY_FILES'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Unexpected file field. Use "audio" field name.',
      code: 'UNEXPECTED_FILE'
    });
  }

  // Custom application errors
  if (err.message.includes('Transcription failed')) {
    return res.status(422).json({
      error: err.message,
      code: 'TRANSCRIPTION_ERROR'
    });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      error: err.message,
      code: 'INVALID_FILE_TYPE'
    });
  }

  // AssemblyAI API errors
  if (err.response?.status === 401) {
    return res.status(500).json({
      error: 'Internal server error: Authentication failed',
      code: 'AUTH_ERROR'
    });
  }

  if (err.response?.status === 429) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again later.',
      code: 'RATE_LIMIT'
    });
  }

  // Default error
  const statusCode = err.statusCode || err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    error: `Endpoint not found: ${req.method} ${req.path}`,
    code: 'NOT_FOUND',
    availableEndpoints: {
      health: 'GET /health',
      api: 'GET /api',
      transcribe: 'POST /api/transcribe'
    }
  });
};

module.exports = { errorHandler, notFound };