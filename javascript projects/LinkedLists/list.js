export default LinkedList;

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}


class LinkedList {
  constructor() {
    this.headNode = null;
  }


  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }


  size() {
    let count = 0;
    let current = this.headNode;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }


  head() {
    return this.headNode;
  }


  tail() {
    if (!this.headNode) return null;
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (index < 0) return null;
    let current = this.headNode;
    let count = 0;
    while (current) {
      if (count === index) return current;
      current = current.nextNode;
      count++;
    }
    return null; 
  }


  pop() {
    if (!this.headNode) return null;

    if (!this.headNode.nextNode) {
      const poppedNode = this.headNode;
      this.headNode = null;
      return poppedNode;
    }

    let current = this.headNode;
    while (current.nextNode && current.nextNode.nextNode) {
      current = current.nextNode;
    }
    const poppedNode = current.nextNode;
    current.nextNode = null;
    return poppedNode;
  }

  contains(value) {
    let current = this.headNode;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  
  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let str = '';
    let current = this.headNode;
    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    str += 'null';
    return str;
  }


  insertAt(value, index) {
    if (index < 0) return;

    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.headNode;
    let count = 0;

    while (current && count < index - 1) {
      current = current.nextNode;
      count++;
    }

    if (!current) return;

    newNode.nextNode = current.nextNode;
    current.nextNode = newNode;
  }

 
  removeAt(index) {
    if (index < 0 || !this.headNode) return;

    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }

    let current = this.headNode;
    let count = 0;

    while (current.nextNode && count < index - 1) {
      current = current.nextNode;
      count++;
    }

    if (!current.nextNode) return; 

    current.nextNode = current.nextNode.nextNode;
  }
}
