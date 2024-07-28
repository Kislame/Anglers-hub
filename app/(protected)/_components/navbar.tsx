'use client';

import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type Props = {};
export const Navbar = ({}: Props) => {
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastEl = useRef<HTMLAnchorElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const menuRefBtn = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    slideRef.current?.classList.add('visible', 'open');
    setTimeout(() => {
      btnRef.current?.focus();
    }, 1);
    menuRefBtn.current?.setAttribute('aria-hidden', 'true');
  };
  const closeNav = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === 'keyup' && (e as React.KeyboardEvent).key !== 'Escape') {
      return;
    }
    slideRef.current?.classList.remove('open');
    menuRefBtn.current?.removeAttribute('aria-hidden');
    setTimeout(() => {
      menuRefBtn.current?.focus();
    }, 1);
    setTimeout(() => {
      slideRef.current?.classList.remove('visible');
    }, 501);
  };

  function moveFocusToTop(e: React.KeyboardEvent) {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      btnRef.current?.focus();
    }
  }
  function moveFocusToBottom(e: React.KeyboardEvent) {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastEl.current?.focus();
    }
  }

  return (
    <header className="header rounded-md shadow-md px-4">
      <UserButton />
      <nav role="navigation" aria-label="Main menu" className="relative">
        <Button
          aria-label="open navigation"
          aria-controls="main-menu"
          aria-expanded="false"
          className="nav__menu-bars "
          ref={menuRefBtn}
          onClick={() => handleClick()}
        >
          <FiMenu fontSize={'20px'} />
        </Button>
        <div id="main-menu" ref={slideRef} className="slide-nav bg-white">
          <Button
            className="nav__menu-close  "
            aria-label="close navigation"
            ref={btnRef}
            onClick={closeNav}
            onKeyDown={moveFocusToBottom}
          >
            <IoMdClose />
          </Button>
          <ul>
            <li>
              {' '}
              <Button
                asChild
                variant={pathname === '/posts' ? 'default' : 'outline'}
              >
                <Link href={'/posts'}>Posts</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === '/settings' ? 'default' : 'outline'}
              >
                <Link href={'/settings'}>Settings</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === '/profile' ? 'default' : 'outline'}
              >
                <Link href={'/profile'}>Profile</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === '/editor' ? 'default' : 'outline'}
              >
                <Link onKeyDown={moveFocusToTop} ref={lastEl} href={'/editor'}>
                  Add Post
                </Link>
              </Button>
            </li>

            {/* <li>
            <Button
              asChild
              variant={pathname === '/admin' ? 'default' : 'outline'}
            >
              <Link href={'/admin'}>admin</Link>
            </Button>
          </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};
