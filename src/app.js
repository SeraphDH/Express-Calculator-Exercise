// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Helper function to calculate the mean of an array of numbers
function calculateMean(nums) {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

// Helper function to calculate the median of an array of numbers
function calculateMedian(nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  const middle = Math.floor(sortedNums.length / 2);
  if (sortedNums.length % 2 === 0) {
    return (sortedNums[middle - 1] + sortedNums[middle]) / 2;
  } else {
    return sortedNums[middle];
  }
}

// Helper function to calculate the mode of an array of numbers
function calculateMode(nums) {
  const numCount = {};
  nums.forEach(num => {
    numCount[num] = (numCount[num] || 0) + 1;
  });

  let mode = [];
  let maxCount = 0;

  for (const num in numCount) {
    if (numCount[num] > maxCount) {
      mode = [num];
      maxCount = numCount[num];
    } else if (numCount[num] === maxCount) {
      mode.push(num);
    }
  }

  return mode.map(Number);
}

// Express route for calculating the mean
app.get('/mean', (req, res) => {
  const numsParam = req.query.nums;
  if (!numsParam) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const nums = numsParam.split(',').map(Number);
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums' });
  }

  const mean = calculateMean(nums);

  res.json({ operation: 'mean', value: mean });
});

// Express route for calculating the median
app.get('/median', (req, res) => {
  const numsParam = req.query.nums;
  if (!numsParam) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const nums = numsParam.split(',').map(Number);
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums' });
  }

  const median = calculateMedian(nums);

  res.json({ operation: 'median', value: median });
});

// Express route for calculating the mode
app.get('/mode', (req, res) => {
  const numsParam = req.query.nums;
  if (!numsParam) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const nums = numsParam.split(',').map(Number);
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number(s) in nums' });
  }

  const mode = calculateMode(nums);

  res.json({ operation: 'mode', value: mode });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
