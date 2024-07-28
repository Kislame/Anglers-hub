import { currentUser } from '@/lib/get-user-server';
import QueryLink from '@/components/QueryLink/QueryLink';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  feed?: string;
  tag?: string;
};

const ToggleFeed = async ({ feed, tag }: Props) => {
  const user = await currentUser();
  return (
    <nav className=" p-3 rounded-xl shadow-sm bg-white">
      <ul className="flex flex-wrap justify-between">
        <li>
          <QueryLink
            query={{ feed: 'mycatch' }}
            className={cn('nav-link', feed === 'mycatch' && 'active')}
          >
            {'My Catchs'}
          </QueryLink>
        </li>

        <li>
          <QueryLink
            query={{ feed: 'followed' }}
            className={cn('nav-link', feed === 'followed' && 'active')}
          >
            {'Followed'}
          </QueryLink>
        </li>

        <li>
          <QueryLink
            query={{ feed: 'favorited' }}
            className={cn('nav-link', feed === 'favorited' && !tag && 'active')}
          >
            {'Favorite'}
          </QueryLink>
        </li>
        <li>
          {tag && (
            <Link
              href={{ pathname: '/posts', query: { name: 'tag' } }}
              className="nav-link active"
            >
              {`#${tag}`}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ToggleFeed;
