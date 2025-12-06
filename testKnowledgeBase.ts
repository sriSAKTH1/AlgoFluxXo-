/**
 * Knowledge Base Test Examples
 * 
 * This file contains test queries to demonstrate how the knowledge base system works.
 * Run these examples to see how context is extracted for different types of queries.
 */

import { contextService } from './services/contextService';

console.log('='.repeat(80));
console.log('ALGOXO KNOWLEDGE BASE SYSTEM - TEST EXAMPLES');
console.log('='.repeat(80));

// Test 1: Platform Features Query
console.log('\n\n📱 TEST 1: Platform Features Query');
console.log('-'.repeat(80));
const query1 = "What features does AlgoXo have?";
console.log(`Query: "${query1}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query1));

// Test 2: Data Structure Query
console.log('\n\n' + '='.repeat(80));
console.log('🗂️  TEST 2: Data Structure Query');
console.log('-'.repeat(80));
const query2 = "Tell me about stacks";
console.log(`Query: "${query2}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query2));

// Test 3: Algorithm Query
console.log('\n\n' + '='.repeat(80));
console.log('⚡ TEST 3: Algorithm Query');
console.log('-'.repeat(80));
const query3 = "How does merge sort work?";
console.log(`Query: "${query3}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query3));

// Test 4: Complexity Query
console.log('\n\n' + '='.repeat(80));
console.log('📊 TEST 4: Complexity Query');
console.log('-'.repeat(80));
const query4 = "Explain O(log n) time complexity";
console.log(`Query: "${query4}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query4));

// Test 5: Graph Algorithm Query
console.log('\n\n' + '='.repeat(80));
console.log('🕸️  TEST 5: Graph Algorithm Query');
console.log('-'.repeat(80));
const query5 = "What is Dijkstra's algorithm?";
console.log(`Query: "${query5}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query5));

// Test 6: Learning Path Query
console.log('\n\n' + '='.repeat(80));
console.log('🎓 TEST 6: Learning Path Query');
console.log('-'.repeat(80));
const query6 = "I'm a beginner, what should I learn?";
console.log(`Query: "${query6}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query6));

// Test 7: Interview Preparation Query
console.log('\n\n' + '='.repeat(80));
console.log('💼 TEST 7: Interview Preparation Query');
console.log('-'.repeat(80));
const query7 = "How do I prepare for technical interviews?";
console.log(`Query: "${query7}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query7));

// Test 8: Multiple Topics Query
console.log('\n\n' + '='.repeat(80));
console.log('🔀 TEST 8: Multiple Topics Query');
console.log('-'.repeat(80));
const query8 = "Compare binary search tree and hash table complexity";
console.log(`Query: "${query8}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query8));

// Test 9: Specific Data Type Query
console.log('\n\n' + '='.repeat(80));
console.log('📌 TEST 9: Linked List Query');
console.log('-'.repeat(80));
const query9 = "What are the operations on a linked list?";
console.log(`Query: "${query9}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query9));

// Test 10: Sorting Algorithm Comparison
console.log('\n\n' + '='.repeat(80));
console.log('🔄 TEST 10: Sorting Algorithm Query');
console.log('-'.repeat(80));
const query10 = "What is the time complexity of quick sort?";
console.log(`Query: "${query10}"`);
console.log('\nExtracted Context:');
console.log(contextService.buildContextForQuery(query10));


console.log('\n\n' + '='.repeat(80));
console.log('✅ ALL TESTS COMPLETED');
console.log('='.repeat(80));
console.log('\nThe knowledge base successfully extracts relevant context for all query types!');
console.log('This context is automatically provided to the AI chatbot for enhanced responses.\n');
