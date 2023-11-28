const Tree = (arr) => {
  const Node = (data) => {
    const left = null;
    const right = null;

    return {
      data,
      left,
      right,
    };
  };

  const mergeSort = (array) => {
    if (array.length < 2) return array;
    const leftLength = Math.floor(array.length / 2);
    const leftArray = mergeSort(array.slice(0, leftLength));
    const rightArray = mergeSort(array.slice(leftLength));

    // Merge left and right array
    const mergedArray = [];
    let i = 0;
    let j = 0;
    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        mergedArray.push(leftArray[i]);
        i += 1;
      } else {
        mergedArray.push(rightArray[j]);
        j += 1;
      }
    }

    // Append any remaining values from longer array
    if (i < leftArray.length) {
      mergedArray.push(...leftArray.slice(i));
    } else if (j < rightArray.length) {
      mergedArray.push(...rightArray.slice(j));
    }
    return mergedArray;
  };
  let root;

  const buildTree = (array, start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const tree = Node(array[mid]);

    tree.left = buildTree(array, start, mid - 1);
    tree.right = buildTree(array, mid + 1, end);

    return tree;
  };

  const createRandomTree = (length) => {
    const array = Array.from({ length }, () =>
      Math.floor(Math.random() * length),
    );
    const sortedArray = mergeSort(array);
    const tree = buildTree(sortedArray, 0, sortedArray.length - 1);
    return tree;
  };

  if (arr) {
    root = buildTree(arr, 0, arr.length - 1);
  } else {
    root = createRandomTree(100);
  }

  const insertNode = (value, node = root) => {
    const currNode = node;
    const newNode = Node(value);

    if (value < currNode.data) {
      if (currNode.left === null) {
        currNode.left = newNode;
      } else {
        insertNode(value, currNode.left);
      }
    } else if (currNode.right === null) {
      currNode.right = newNode;
    } else {
      insertNode(value, currNode.right);
    }
  };

  const deletionReplacement = (node) => {
    let currNode = node;
    let replacementData = currNode.data;
    while (currNode.left != null) {
      replacementData = currNode.left.data;
      currNode = currNode.left;
    }
    return replacementData;
  };

  const deleteNode = (value, node = root) => {
    const currNode = node;
    if (currNode === null) return currNode;

    if (value < currNode.data) {
      currNode.left = deleteNode(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = deleteNode(value, currNode.right);
    } else {
      if (currNode.left === null) {
        return currNode.right;
      }
      if (currNode.right === null) {
        return currNode.left;
      }

      currNode.data = deletionReplacement(currNode.right);
      currNode.right = deleteNode(currNode.right, currNode.data);
    }

    return currNode;
  };

  const find = (value, currNode = root) => {
    if (currNode === null) return null;
    if (value === currNode.data) return currNode;

    if (value < currNode.data) {
      return find(value, currNode.left);
    }
    return find(value, currNode.right);
  };

  const levelOrder = (callback, node = root) => {
    if (node === null) return node;
    const queue = [];
    const array = [];

    queue.push(node);
    while (queue.length) {
      const currNode = queue.shift();
      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
      if (callback) {
        callback(currNode);
      } else {
        array.push(currNode);
      }
    }

    if (!callback) {
      return array;
    }
    return node;
  };

  const inOrder = (callback, node = root) => {
    if (node == null) return null;

    if (!callback) {
      const array = [];
      if (node.left) {
        array.push(...inOrder(callback, node.left).slice());
      }
      array.push(node);
      if (node.right) {
        array.push(...inOrder(callback, node.right).slice());
      }

      return array;
    }
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
    return null;
  };

  const preOrder = (callback, node = root) => {
    if (node == null) return null;

    if (!callback) {
      const array = [];
      array.push(node);
      if (node.left) {
        array.push(...inOrder(callback, node.left).slice());
      }
      if (node.right) {
        array.push(...inOrder(callback, node.right).slice());
      }

      return array;
    }
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
    return null;
  };

  const postOrder = (callback, node = root) => {
    if (node == null) return null;

    if (!callback) {
      const array = [];
      if (node.left) {
        array.push(...inOrder(callback, node.left).slice());
      }
      if (node.right) {
        array.push(...inOrder(callback, node.right).slice());
      }
      array.push(node);
      return array;
    }
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
    return null;
  };

  const height = (node = root) => {
    if (node === null) {
      return -1;
    }
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const depth = (node, currNode = root) => {
    if (currNode === null) return null;
    if (node.data === currNode.data) {
      return 0;
    }
    if (node.data < currNode.data && currNode.left) {
      return depth(node, currNode.left) + 1;
    }
    if (currNode.right) {
      return depth(node, currNode.right) + 1;
    }
    return null;
  };

  const isBalanced = (node = root) =>
    node == null ||
    (isBalanced(node.left) &&
      isBalanced(node.right) &&
      Math.abs(height(node.left) - height(node.right)) <= 1);

  const reBalance = () => {
    const array = preOrder().map((obj) => obj.data);
    const sortedArray = mergeSort(array);
    root = buildTree(sortedArray, 0, sortedArray.length - 1);
    return root;
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    root: () => root,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
    createRandomTree,
    prettyPrint,
  };
};

export default Tree;
