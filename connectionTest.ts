// Quick Connection Test - Run this to verify knowledge base is connected
// Usage: Just import this anywhere or check the console

import { contextService } from './services/contextService';

console.log('🔍 Testing AlgoXo Knowledge Base Connection...\n');

// Test 1: Can we access the knowledge base?
try {
    const platformInfo = contextService.getPlatformInfo();
    console.log('✅ TEST 1 PASSED: Knowledge base accessible');
    console.log('   Platform:', platformInfo.split('\n')[0]);
} catch (error) {
    console.error('❌ TEST 1 FAILED: Cannot access knowledge base', error);
}

// Test 2: Can we extract data structure info?
try {
    const stackInfo = contextService.getDataStructureInfo('stack');
    if (stackInfo.includes('Stack') && stackInfo.includes('O(1)')) {
        console.log('✅ TEST 2 PASSED: Data structure extraction working');
        console.log('   Found Stack with O(1) complexity');
    } else {
        console.log('⚠️ TEST 2 WARNING: Stack info found but incomplete');
    }
} catch (error) {
    console.error('❌ TEST 2 FAILED: Cannot extract data structure info', error);
}

// Test 3: Can we extract algorithm info?
try {
    const mergeInfo = contextService.getAlgorithmInfo('merge sort');
    if (mergeInfo.includes('Merge Sort') && mergeInfo.includes('O(n log n)')) {
        console.log('✅ TEST 3 PASSED: Algorithm extraction working');
        console.log('   Found Merge Sort with O(n log n) complexity');
    } else {
        console.log('⚠️ TEST 3 WARNING: Merge Sort info found but incomplete');
    }
} catch (error) {
    console.error('❌ TEST 3 FAILED: Cannot extract algorithm info', error);
}

// Test 4: Can we build context for a query?
try {
    const context = contextService.buildContextForQuery('What is binary search?');
    if (context.length > 0) {
        console.log('✅ TEST 4 PASSED: Query context building working');
        console.log('   Generated context length:', context.length, 'characters');
    } else {
        console.log('⚠️ TEST 4 WARNING: Context generated but empty');
    }
} catch (error) {
    console.error('❌ TEST 4 FAILED: Cannot build query context', error);
}

// Test 5: Check complexity info
try {
    const complexityInfo = contextService.getComplexityInfo('O(log n)');
    if (complexityInfo.includes('Logarithmic')) {
        console.log('✅ TEST 5 PASSED: Complexity extraction working');
        console.log('   Found logarithmic time explanation');
    } else {
        console.log('⚠️ TEST 5 WARNING: Complexity info found but incomplete');
    }
} catch (error) {
    console.error('❌ TEST 5 FAILED: Cannot extract complexity info', error);
}

console.log('\n🎉 CONNECTION TEST COMPLETED!');
console.log('📊 If all tests passed, the knowledge base is fully connected to the chat system.');
console.log('💬 Try asking questions in the chat interface to see it in action!');

export default 'Knowledge Base Connection Test Complete';
