class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== currentIndex) {
        [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }
}

function minCostToConnectRopes(ropes) {
  const minHeap = new MinHeap();

  // Populate the min heap with the lengths of the ropes
  ropes.forEach(length => minHeap.push(length));

  let totalCost = 0;

  while (minHeap.heap.length > 1) {
    // Extract the two smallest ropes
    const firstMin = minHeap.pop();
    const secondMin = minHeap.pop();

    // Calculate the cost of connecting them
    const currentCost = firstMin + secondMin;

    // Add the cost to the total
    totalCost += currentCost;

    // Push the newly formed rope back into the min heap
    minHeap.push(currentCost);
  }

  return totalCost;
}

// Example usage
const ropes = [4, 3, 2, 6];
const result = minCostToConnectRopes(ropes);
console.log(result); // Output: 29
