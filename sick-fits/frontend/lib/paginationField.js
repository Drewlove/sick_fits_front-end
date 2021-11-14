import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // the .filter filters out 'undefined' items in the existing array
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items AND there aren't enough to satisfy how many were requested (first)
      // AND we are on the last page, then just send the items
      // ie, this happens when there are not enough items to fill the last page entirely
      if (items.length && items.length !== first && page === pages)
        return items;
      if (items.length !== first) return false;

      if (items.length) {
        return items;
      }

      return false; // fallback to network if the previous two 'if' statements are both false.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
