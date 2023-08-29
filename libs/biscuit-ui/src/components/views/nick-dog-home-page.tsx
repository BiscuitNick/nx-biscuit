'use client';
import React, { useState, Fragment } from 'react';
import '../../styles/global.css';
import Link from 'next/link';
import { NavItemsRow } from '../navigation';

import { FadeRightLine, FadeLeftLine } from '../lines';
import { AnimatedGradientTitleText } from '../texts';
import { GitHubLink } from '../icons';
import {
  BiscuitBoard,
  executiveCat,
  executiveDog,
} from '@biscuitnick/biscuit-konva';

interface HomePageProps {
  title: string;
  description: string[];
  navItems: { name: string; href: string }[];
  gitHubUrl?: string;
}

export const NickDogHomePage = (props: HomePageProps) => {
  const { title, description, navItems, gitHubUrl } = props;
  const [isCatMode, setIsCatMode] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen">
      <NavItemsRow navItems={navItems} />

      <div className="my-2 animate-fade-in flex flex-row space-x-2 h400">
        <BiscuitBoard
          height={400}
          width={400}
          contentObject={isCatMode ? executiveCat : executiveDog}
          contentIDs={
            isCatMode
              ? ['image_1', 'eye_0', 'eye_1']
              : ['image_2', 'eye_0', 'eye_1']
          }
        />
      </div>
      <FadeRightLine />
      <AnimatedGradientTitleText
        text={isCatMode ? 'NICK.CAT' : title}
        handleClick={() => setIsCatMode(!isCatMode)}
      />
      <FadeLeftLine />
      <p className="my-8 text-sm text-center animate-fade-in">
        {description.map((text) => (
          <Fragment key={text}>
            {text}
            <br />
          </Fragment>
        ))}
        {gitHubUrl && (
          <GitHubLink
            href={gitHubUrl}
            style={{
              margin: 10,
              fontSize: 'xx-large',
            }}
          />
        )}
      </p>
    </div>
  );
};
