'use client';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import {
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { Button } from '../ui/button';
import { IoIosCloseCircle } from 'react-icons/io';
import { useMemo, useEffect } from 'react';
import { Tag } from '@/types/responses';

type TagsComProps = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  postTags?: { name: string }[];
};

const TagsCom = ({ tags, setTags, postTags }: TagsComProps) => {
  console.log(tags);
  const limit = 10;

  const handleDelete = useCallback(
    (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    },
    [tags, setTags]
  );

  const handleAddition = useCallback(
    (tag: Tag) => {
      if (tags.length === limit) return;

      setTags((prevTags) => {
        return [...prevTags, tag];
      });
    },
    [tags.length, setTags]
  );

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val) {
        e.currentTarget.value = '';
        handleAddition({ id: uuidv4(), name: val });
      }
    }
  };

  const onClearAll = () => {
    setTags([]);
  };

  useEffect(() => {
    if (postTags) {
      setTags(postTags.map((tag) => ({ id: uuidv4(), name: tag.name })));
    }
  }, [postTags, setTags]);

  const tagElements = useMemo(
    () =>
      tags.map((tag, index) => (
        <li
          className="bg-white py-2 px-3 font-medium rounded-md tracking-wider text-sm flex items-center gap-2 shadow-md"
          key={tag.id}
        >
          {tag.name}
          <button onClick={() => handleDelete(index)}>
            <IoIosCloseCircle className="text-2xl font-semibold" />
          </button>
        </li>
      )),
    [tags, handleDelete]
  );
  return (
    <div className="h-80 w-full items-center justify-center flex flex-col gap-8">
      <section className="flex gap-4  flex-col sm:flex-row">
        <Input placeholder="Enter tags" type="text" onKeyDown={handleKeyDown} />

        <Button variant={'secondary'} onClick={onClearAll}>
          clear all
        </Button>
      </section>
      <ul className="flex flex-wrap gap-2  justify-center max-w-sm">
        {tagElements}
      </ul>
    </div>
  );
};

export default TagsCom;
