// Beginner: distribute keys across nodes with a hash ring.
// Advanced: reduces key remapping when nodes join/leave.
class HashRing {
  constructor(nodes = []) {
    this.nodes = [...nodes].sort();
  }

  addNode(node) {
    this.nodes.push(node);
    this.nodes.sort();
  }

  getNode(key) {
    if (this.nodes.length === 0) return null;
    let hash = 0;
    for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    return this.nodes[hash % this.nodes.length];
  }
}

module.exports = { HashRing };
