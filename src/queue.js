const MaxHeap = require('./max-heap.js');

class PriorityQueue
{
    constructor(maxSize)
{
    if (maxSize != null) this.maxSize = maxSize;
    else this.maxSize = 30;
    this.heap = new MaxHeap();
}

    push(data, priority)
    {                
        if (this.heap.size() < this.maxSize) this.heap.push(data, priority);
        else throw new Error("The queue is full!");
    }

    shift()
    {
        if (this.isEmpty()) throw new Error("The queue is full!");
        return this.heap.pop();
    }

    size()
    {
        return this.heap.size();
    }

    isEmpty()
    {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;
