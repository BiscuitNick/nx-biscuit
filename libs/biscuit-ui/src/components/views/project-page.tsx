'use client';
import '../../styles/global.css';
// import Link from 'next/link';
// import { useState } from 'react';
import { GradientTitleText } from '../texts';
import { FadeRightLine, FadeLeftLine } from '../lines';
import { NavItemsRow } from '../navigation';

interface HomePageProps {
  title: string;
  description: string;
  navItems: { name: string; href: string }[];
}

export const ProjectPage = (props: HomePageProps) => {
  const { title, description, navItems } = props;
  // const [selectedItem, setSelectedItem] = useState('');

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <NavItemsRow navItems={navItems} />
      <FadeRightLine />
      <GradientTitleText text={title} />
      <FadeLeftLine />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">{description}</h2>
      </div>
    </div>
  );
};
