# Feedback API Implementation Guide

To connect the frontend `feedbackService` to a real backend, follow this guide.

## 1. Database Schema (MongoDB / Mongoose)

```typescript
// models/Feedback.ts
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedbackType: {
    type: String,
    required: true,
    enum: ['bug', 'feature', 'general', 'other']
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  userId: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'resolved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
```

## 2. API Endpoint (Node.js / Express)

```typescript
// routes/feedback.ts
import express from 'express';
import { Feedback } from '../models/Feedback';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// POST /api/feedback
router.post(
  '/',
  [
    body('feedbackType').isIn(['bug', 'feature', 'general', 'other']),
    body('message').trim().isLength({ min: 5, max: 500 }).escape(),
  ],
  async (req, res) => {
    // 1. Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { feedbackType, message, userId } = req.body;

      // 2. Save to DB
      const newFeedback = new Feedback({
        feedbackType,
        message,
        userId // Optional: get from auth middleware if available
      });

      await newFeedback.save();

      // 3. Success Response
      res.status(201).json({
        success: true,
        message: 'Feedback received successfully',
        id: newFeedback._id
      });

    } catch (error) {
      console.error('Feedback Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.'
      });
    }
  }
);

export default router;
```

## 3. Example cURL Request

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "feedbackType": "feature",
    "message": "I would love to see a dark mode toggle in the sidebar!",
    "userId": "user_123"
  }'
```

## 4. Frontend Integration

Update `services/feedbackService.ts` to use `fetch`:

```typescript
submitFeedback: async (data: FeedbackData): Promise<FeedbackResponse> => {
    // ... validation ...

    try {
        const response = await fetch('YOUR_API_URL/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}
```
