// Beginner: parse query params for pagination/filter behavior.
// Advanced: always clamp user inputs to avoid abuse and expensive queries.
function paginateAndFilter(items, query) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const search = (query.search || '').trim().toLowerCase();

  const filtered = search
    ? items.filter((item) => item.name.toLowerCase().includes(search))
    : items;

  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return {
    data,
    meta: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    }
  };
}

module.exports = { paginateAndFilter };
