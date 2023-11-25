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

  const buildTree = (array, start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  };
  const root = buildTree(arr, 0, arr.length - 1);

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

  const prettyPrint = (node, prefix = "", isLeft = true) => {
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
    root,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    prettyPrint,
  };
};

export default Tree;
