import QueryLink from '@/components/QueryLink/QueryLink';

import { PAGE_LIMIT } from '@/lib/utils';

interface PaginationProps {
  count: number;
  page: number;
}

const Pagination = ({ count, page }: PaginationProps) => {
  const pageCount = Math.ceil(count / PAGE_LIMIT);
  let countArray = new Array(pageCount).fill('');

  return (
    <nav>
      <ul className="flex justify-center">
        {countArray.map((_, index) => (
          <li
            key={index}
            className={
              page === index + 1
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-80'
            }
          >
            <QueryLink
              reserved
              query={{ page: index + 1 }}
              key={index}
              className="px-3 py-4"
            >
              {index + 1}
            </QueryLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
