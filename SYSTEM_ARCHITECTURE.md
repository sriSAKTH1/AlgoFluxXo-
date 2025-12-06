# AlgoXo Knowledge Base System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                                 │
│                                                                          │
│  ┌────────────────┐                          ┌────────────────┐         │
│  │ Chat Interface │                          │  Chat to Learn │         │
│  │  (Floating)    │                          │  (Full Page)   │         │
│  └────────┬───────┘                          └────────┬───────┘         │
│           │                                           │                 │
└───────────┼───────────────────────────────────────────┼─────────────────┘
            │                                           │
            │          User Query: "What is merge sort?"│
            │                                           │
            ▼                                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        GEMINI SERVICE (Enhanced)                         │
│                      services/geminiService.ts                           │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  sendChatMessage(history, newMessage, useThinking)               │   │
│  │                                                                  │   │
│  │  1. Receive user query                                          │   │
│  │  2. Call contextService.buildContextForQuery(newMessage) ────┐  │   │
│  │  3. Build enhanced system prompt                             │  │   │
│  │  4. Send to Gemini AI                                        │  │   │
│  │  5. Return response                                          │  │   │
│  └──────────────────────────────────────────────────────────────┼───┘   │
└───────────────────────────────────────────────────────────────────┼───────┘
                                                                    │
                                                                    │
                                                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTEXT SERVICE                                  │
│                     services/contextService.ts                           │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  buildContextForQuery(query: string)                             │   │
│  │                                                                  │   │
│  │  Analyzes query and extracts relevant information:              │   │
│  │                                                                  │   │
│  │  • Detects keywords (merge, sort, algorithm, etc.)              │   │
│  │  • Calls appropriate getter methods                             │   │
│  │  • Combines context from multiple sources                       │   │
│  │  • Returns structured context string                            │   │
│  └──────────┬───────────────────────────────────────────────────────┘   │
│             │                                                            │
│             │  Sub-methods:                                              │
│             │                                                            │
│             ├─→ getPlatformInfo()                                        │
│             ├─→ getDataStructureInfo(query)                              │
│             ├─→ getAlgorithmInfo(query) ◄─── For "merge sort"           │
│             ├─→ getComplexityInfo(query)                                 │
│             ├─→ getInterviewInfo()                                       │
│             └─→ getLearningPath(level)                                   │
│                                                                          │
└──────────────┼───────────────────────────────────────────────────────────┘
               │
               │ Reads from
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         KNOWLEDGE BASE                                   │
│                        knowledgeBase.json                                │
│                                                                          │
│  {                                                                       │
│    "platform": {                                                         │
│      "name": "AlgoXo",                                                   │
│      "features": [...]                                                   │
│    },                                                                    │
│    "dataStructures": {                                                   │
│      "classification": {                                                 │
│        "linear": ["Array", "Stack", "Queue", "LinkedList"],             │
│        "nonLinear": ["Tree", "Graph", "Trie", "HashTable"]              │
│      }                                                                   │
│    },                                                                    │
│    "algorithms": {                                                       │
│      "types": [                                                          │
│        {                                                                 │
│          "name": "Sorting Algorithms",                                   │
│          "algorithms": [                                                 │
│            {                                                             │
│              "name": "Merge Sort", ◄───── EXTRACTED!                     │
│              "description": "Divide and conquer...",                     │
│              "timeComplexity": {                                         │
│                "best": "O(n log n)",                                     │
│                "average": "O(n log n)",                                  │
│                "worst": "O(n log n)"                                     │
│              },                                                          │
│              "spaceComplexity": "O(n)",                                  │
│              ...                                                         │
│            }                                                             │
│          ]                                                               │
│        }                                                                 │
│      ]                                                                   │
│    },                                                                    │
│    "complexity": {...},                                                  │
│    "interviewPreparation": {...},                                        │
│    "learningPath": {...}                                                 │
│  }                                                                       │
│                                                                          │
│  📊 Statistics:                                                          │
│  • 8 Platform Features                                                  │
│  • 8 Data Structures (detailed)                                         │
│  • 20+ Algorithms (with complexity)                                     │
│  • 8 Big O Notations (explained)                                        │
│  • 14+ Real-world Applications                                          │
│  • 3 Learning Paths                                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

                              │
                              │ Context flows back up
                              ▼
                              
┌─────────────────────────────────────────────────────────────────────────┐
│                     ENHANCED AI PROMPT                                   │
│                                                                          │
│  System: You are AlgoXo, an AI-powered DSA tutor...                     │
│                                                                          │
│  PLATFORM CONTEXT:                                                       │
│  AlgoXo features: Visualizers, IDE, Notes, Live Tutor...                │
│                                                                          │
│  RELEVANT KNOWLEDGE BASE INFORMATION:                                    │
│                                                                          │
│  Merge Sort:                                                             │
│  Description: Divide and conquer algorithm that divides array,          │
│               sorts, and merges                                          │
│  Time Complexity:                                                        │
│    - Best: O(n log n)                                                    │
│    - Average: O(n log n)                                                 │
│    - Worst: O(n log n)                                                   │
│  Space Complexity: O(n)                                                  │
│  Stable: true                                                            │
│  In-Place: false                                                         │
│                                                                          │
│  History: [previous messages...]                                         │
│                                                                          │
│  User: "What is merge sort?"                                             │
│                                                                          │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
                           │ Sent to Gemini AI
                           ▼
                           
┌─────────────────────────────────────────────────────────────────────────┐
│                        GEMINI AI RESPONSE                                │
│                                                                          │
│  Merge Sort is an efficient divide-and-conquer sorting algorithm!       │
│                                                                          │
│  🎯 How it works:                                                        │
│  1. Divide: Split array into two halves                                 │
│  2. Conquer: Recursively sort each half                                 │
│  3. Combine: Merge sorted halves back together                          │
│                                                                          │
│  ⏱️ Time Complexity:                                                     │
│  • Best, Average, Worst: O(n log n) - consistently fast!                │
│                                                                          │
│  💾 Space Complexity: O(n) - needs extra space for merging              │
│                                                                          │
│  ✅ Advantages:                                                          │
│  • Stable sort (preserves order of equal elements)                      │
│  • Predictable O(n log n) performance                                   │
│  • Great for large datasets                                             │
│                                                                          │
│  ❌ Disadvantages:                                                       │
│  • Not in-place (needs extra memory)                                    │
│  • Slower than QuickSort for small arrays                               │
│                                                                          │
│  🎨 Want to see it in action?                                            │
│  Try AlgoXo's Sorting Visualizer to watch Merge Sort step-by-step!      │
│                                                                          │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
                           │ Response returned to user
                           ▼
                           
                      ✨ USER SEES ANSWER ✨

═══════════════════════════════════════════════════════════════════════════

KEY FLOW:

1. User asks question
2. Gemini Service calls Context Service
3. Context Service analyzes query & reads Knowledge Base
4. Relevant information extracted
5. Enhanced prompt created with context
6. Sent to Gemini AI
7. AI generates educated response
8. User receives accurate, comprehensive answer!

═══════════════════════════════════════════════════════════════════════════
```
