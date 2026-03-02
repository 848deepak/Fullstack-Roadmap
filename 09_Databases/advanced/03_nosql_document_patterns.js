// Beginner: document-style modeling for flexible schemas.
// Advanced: embed frequently-read child docs, reference large/high-cardinality relations.

const userDocument = {
  _id: 'u_1001',
  profile: {
    name: 'Deepak',
    email: 'deepak@example.com'
  },
  // Embedded for fast read of recent activity (bounded list).
  recentOrders: [
    { orderId: 'o_1', total: 1200, status: 'DELIVERED' },
    { orderId: 'o_2', total: 900, status: 'CREATED' }
  ],
  // Referenced collection for full order history if it grows large.
  orderCollectionRef: 'orders_by_user_u_1001'
};

module.exports = { userDocument };
