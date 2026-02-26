const { getMusicTitlesByYear, filterAndTransformTracks } = require('./2345678-lab3.js');

// Test data
const testTracks = [
    { title: 'Song B', artist: 'Artist', year: 2020 },
    { title: 'Song A', artist: 'Artist', year: 2020 },
];

// Test function 1
console.log("Test 1:");
console.log(getMusicTitlesByYear(testTracks));
// Expected: { 2020: ['Song A', 'Song B'] }

// Test function 2
console.log("\nTest 2:");
console.log(filterAndTransformTracks(testTracks, {}));
