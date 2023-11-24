const LinkedList = () => {
  const Node = (value = null, nextNode = null) => ({
    value,
    nextNode,
  });
  let headNode = Node();

  const append = (value) => {
    if (headNode.value === null && headNode.nextNode === null) {
      headNode = Node(value);
      return;
    }

    let currNode = headNode;

    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }
    currNode.nextNode = Node(value);
  };

  const prepend = (value) => {
    headNode = Node(value, headNode);
  };

  const size = () => {
    let i = 0;
    let currNode = headNode;

    while (currNode !== null) {
      i += 1;
      currNode = currNode.nextNode;
    }

    return i;
  };

  const head = () => headNode;

  const tail = () => {
    let currNode = headNode;

    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }

    return currNode;
  };

  const at = (index) => {
    let currNode = headNode;
    for (let i = 0; i < index; i += 1) {
      currNode = currNode.nextNode;
    }

    return currNode;
  };

  const pop = () => {
    if (headNode.nextNode === null) {
      headNode = Node();
    } else {
      let currNode = headNode;

      while (currNode.nextNode.nextNode !== null) {
        currNode = currNode.nextNode;
      }

      currNode.nextNode = null;
    }
  };

  const search = (currNode, value) => {
    let currentNode = currNode;
    if (currentNode.value === value) {
      return true;
    }
    if (currentNode.nextNode === null) {
      return false;
    }
    currentNode = currentNode.nextNode;
    return search(currentNode, value);
  };

  const contains = (value) => {
    const currNode = headNode;

    return search(currNode, value);
  };

  const find = (value) => {
    let currNode = headNode;
    let i = 0;
    while (currNode.value !== value) {
      if (currNode.nextNode === null) {
        return null;
      }
      currNode = currNode.nextNode;
      i += 1;
    }
    return i;
  };

  const toString = () => {
    let currentNode = headNode;

    let nodeString = "";

    while (currentNode !== null) {
      nodeString += `${currentNode.value} -> `;
      currentNode = currentNode.nextNode;
    }
    nodeString += "null";

    return nodeString;
  };

  const insertAt = (value, index) => {
    const prevNode = at(index - 1);
    const nextNode = at(index);
    const newNode = Node(value, nextNode);
    prevNode.nextNode = newNode;
  };

  const removeAt = (index) => {
    const previousNode = at(index - 1);
    const removedNode = at(index);
    previousNode.nextNode = removedNode.nextNode;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

export default LinkedList;
