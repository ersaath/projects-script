
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }


  buildTree(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    return this.buildBalanced(sorted, 0, sorted.length - 1);
  }

  buildBalanced(sorted, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(sorted[mid]);

    node.left = this.buildBalanced(sorted, start, mid - 1);
    node.right = this.buildBalanced(sorted, mid + 1, end);

    return node;
  }


  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }


  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let minNode = node.right;
      while (minNode.left !== null) minNode = minNode.left;

      node.data = minNode.data;
      node.right = this.deleteItem(minNode.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (value === node.data) return node;
    return value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  
  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

 
  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      this.inOrderForEach(callback, node.left);
      callback(node);
      this.inOrderForEach(callback, node.right);
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      callback(node);
      this.preOrderForEach(callback, node.left);
      this.preOrderForEach(callback, node.right);
    }
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      this.postOrderForEach(callback, node.left);
      this.postOrderForEach(callback, node.right);
      callback(node);
    }
  }


  height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }


  depth(value, node = this.root, d = 0) {
    if (node === null) return null;
    if (node.data === value) return d;
    return value < node.data
      ? this.depth(value, node.left, d + 1)
      : this.depth(value, node.right, d + 1);
  }

  
  isBalanced(node = this.root) {
    if (node === null) return true;
    const leftH = this.height(node.left);
    const rightH = this.height(node.right);
    if (Math.abs(leftH - rightH) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }


  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomArray(size = 15) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const tree = new Tree(randomArray());

console.log("Balanced?", tree.isBalanced());
console.log("Level order:");
tree.levelOrderForEach((node) => console.log(node.data));

console.log("Preorder:");
tree.preOrderForEach((node) => console.log(node.data));

console.log("Inorder:");
tree.inOrderForEach((node) => console.log(node.data));

console.log("Postorder:");
tree.postOrderForEach((node) => console.log(node.data));


tree.insert(120);
tree.insert(130);
tree.insert(150);

console.log("Balanced after inserts?", tree.isBalanced());


tree.rebalance();
console.log("Balanced after rebalance?", tree.isBalanced());


console.log("Level order:");
tree.levelOrderForEach((node) => console.log(node.data));
