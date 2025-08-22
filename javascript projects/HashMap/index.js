// if ( index < 0 ||  index >= buckets.length) {
//     throw new Error ("Trying to access index out of bounds");
// }

class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0 ;
        this.buckets = new Array(this.capacity).fill(null).map(() =>[]);

    }

    hash(key) {
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
           if (bucket[i][0] === key) {
            bucket[i][1] = value;
            return;
           }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }

    }

    get(key) {
  const index = this.hash(key);
  const bucket = this.buckets[index];

  for (let i = 0; i < bucket.length; i++) {
    const pair = bucket[i];
    if (pair[0] === key) return pair[1];
  }

  return null;
}

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0]=== key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() =>[]);
        this.size = 0;
    }


    keys() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let [k] of bucket) {
        result.push(k);
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let bucket of this.buckets) {
        for (let [, v] of bucket) {
            result.push(v);
        }
    }
    return result;
  }

 entries() {
  const result = [];
  for (let bucket of this.buckets) {
    for (let i = 0; i < bucket.length; i++) {
      result.push([bucket[i][0], bucket[i][1]]);
    }
  }
  return result;
}



 resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [k, v] of bucket) {
        this.set(k, v);
      }
    }
  }

}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Size before resize:", test.length());

test.set('moon', 'silver');

console.log("Size after resize:", test.length());
console.log("Capacity after resize:", test.capacity);

console.log("Get apple:", test.get("apple"));
console.log("Has banana:", test.has("banana"));
console.log("Remove dog:", test.remove("dog")); 
console.log("Length:", test.length());
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

