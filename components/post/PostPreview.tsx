import { CatchResponse } from '@/types/responses';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { GearIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { currentUser } from '@/lib/get-user-server';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  catchItem: CatchResponse;
};

const PostPreview = async ({ catchItem }: Props) => {
  const loggedUser = await currentUser();

  const isOwner = loggedUser?.id === catchItem.userId;
  return (
    <Card className="w-[360px] mx-auto">
      <CardHeader className=" gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={catchItem.user?.image || ''} alt="Avatar" />
              <AvatarFallback className="bg-sky-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          {isOwner && (
            <DropdownMenuContent sideOffset={2} className="w-40" align="start">
              <Button variant={'link'}>
                <DropdownMenuItem>
                  <GearIcon className="mr-2 h-4 w-4" />
                  <Link href={`/editor/${catchItem.id}`}>Edit Post</Link>
                </DropdownMenuItem>
              </Button>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <CardDescription>{catchItem.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={catchItem.imageUrl}
          alt={catchItem.description}
          className="rounded-md max-w-full w-auto h-auto"
          width={330}
          height={330}
          priority={true}
        />
      </CardContent>
      <CardFooter className="text-slate-600 text-sm font-semibold flex-wrap flex-col gap-4">
        <p>
          <strong>Location:</strong> {catchItem.location}
        </p>
        <strong>Tags:</strong>
        <div className="space-x-3">
          {catchItem.tags.map((tag, i) => (
            <span className="bg-gray-200 inline-block p-2" key={i}>
              {tag}
            </span>
          ))}
        </div>
        <p>
          <strong>Posted on:</strong> {catchItem.createdAt}
        </p>
        <p>
          <strong>Last updated:</strong> {catchItem.updatedAt}
        </p>
        <p>
          <strong>Reviews:</strong> {catchItem.reviewsCount}
        </p>
        <FavoriteButton
          isFavorited={catchItem.isFavorited}
          favoriteCount={catchItem.favoriteCount ? catchItem.favoriteCount : 0}
          catchId={catchItem.id}
          loggedUserId={loggedUser?.id as string}
        />
      </CardFooter>
    </Card>
  );
};

export default PostPreview;
