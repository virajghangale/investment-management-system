import java.util.ArrayList;
import java.util.NoSuchElementException;

public class PowerOfTwoMaxHeap {

    private final ArrayList<Integer> dataHeap;
    private final int childCountExponent;

    /**
     * Constructor initializing the heap.
     * Uses a clear, descriptive variable name instead of 'x'.
     *
     * @param childCountExponent The exponent determining that each parent has 2^childCountExponent children.
     */
    public PowerOfTwoMaxHeap(int childCountExponent) {
        if (childCountExponent < 0) {
            throw new IllegalArgumentException("The child count exponent cannot be negative.");
        }
        this.dataHeap = new ArrayList<>();
        this.childCountExponent = childCountExponent;
    }

    /**
     * Inserts a value into the max heap.
     * Time Complexity: O(log_f N) where f = 2^childCountExponent
     */
    public void insert(int item) {
        dataHeap.add(item);
        siftUp(dataHeap.size() - 1);
    }

    /**
     * Removes and returns the maximum value from the heap.
     * Time Complexity: O(f * log_f N) due to scanning sibling elements.
     */
    public int popMax() {
        if (dataHeap.isEmpty()) {
            throw new NoSuchElementException("Cannot pop from an empty heap.");
        }

        int maxVal = dataHeap.get(0);
        int lastIndex = dataHeap.size() - 1;
        int lastItem = dataHeap.remove(lastIndex);

        if (!dataHeap.isEmpty()) {
            dataHeap.set(0, lastItem);
            siftDown(0);
        }

        return maxVal;
    }

    /**
     * Restores max-heap property by moving an element upward.
     * Uses fast bitwise right-shift '>>' instead of mathematical division.
     */
    private void siftUp(int index) {
        int item = dataHeap.get(index);
        while (index > 0) {
            int parentIndex = (index - 1) >> childCountExponent;
            int parentValue = dataHeap.get(parentIndex);

            if (item <= parentValue) {
                break;
            }

            dataHeap.set(index, parentValue);
            index = parentIndex;
        }
        dataHeap.set(index, item);
    }

    /**
     * Restores max-heap property by moving an element downward.
     * Uses fast bitwise left-shift '<<' instead of mathematical multiplication.
     */
    private void siftDown(int index) {
        int heapSize = dataHeap.size();
        int item = dataHeap.get(index);

        while (true) {
            int firstChildIndex = (index << childCountExponent) + 1;
            if (firstChildIndex >= heapSize) {
                break; 
            }

            // Look through all 2^childCountExponent possible children to find the absolute max
            int maxChildIndex = firstChildIndex;
            int maxChildValue = dataHeap.get(firstChildIndex);
            
            int totalPossibleChildren = 1 << childCountExponent;
            int lastChildIndex = Math.min(firstChildIndex + totalPossibleChildren, heapSize);

            for (int i = firstChildIndex + 1; i < lastChildIndex; i++) {
                int currentChildValue = dataHeap.get(i);
                if (currentChildValue > maxChildValue) {
                    maxChildValue = currentChildValue;
                    maxChildIndex = i;
                }
            }

            if (item >= maxChildValue) {
                break;
            }

            dataHeap.set(index, maxChildValue);
            index = maxChildIndex;
        }
        dataHeap.set(index, item);
    }

    public boolean isEmpty() {
        return dataHeap.isEmpty();
    }
}