'use client';
import { FaHeart } from 'react-icons/fa';
import { addToFavorite } from '@/actions/addFavorite';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

type Props = {
  loggedUserId: string;
  catchId: string;
  isFavorited?: boolean;
  favoriteCount: number;
};
export const FavoriteButton = ({
  loggedUserId,
  catchId,
  isFavorited,
  favoriteCount,
}: Props) => {
  const [isLoading, setIsloading] = useState(false);
  const [sucess, setSucess] = useState(isFavorited);
  const [favCount, setFavCount] = useState(favoriteCount);
  const handleClick = async () => {
    setIsloading(true);
    try {
      const data = await addToFavorite(loggedUserId, catchId);
      if (data) {
        if (data.sucess) {
          setSucess(true);
          setFavCount(favCount + 1);
        }
        if (data.deleted) {
          setSucess(false);
          setFavCount(favCount - 1);
        }
        setIsloading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <span>{favCount}</span>
      <Button disabled={isLoading} onClick={handleClick}>
        <FaHeart fill={`${sucess ? 'red' : 'white'}`}></FaHeart>
      </Button>
    </>
  );
};
