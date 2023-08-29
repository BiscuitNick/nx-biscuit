// import Link from 'next/link';

interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;

  // type
  // style
  //
}

export const ContentCard = (props: ContentCardProps) => {
  const { title = 'title', image = '', href = 'href' } = props;

  // return (
  //   <Link
  //     href={href}
  //     className="block rounded-2xl border-2 border-gray-EE p-3 pb-4 hover:border-gray-F7 hover:bg-gray-F7 transition-colors"
  //   >
  //     <div className="relative">
  //       <div className="absolute inset-0 rounded-xl shadow-website-screenshot"></div>
  //       <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden relative bg-gray-F7">
  //         <img
  //           sizes="(max-width: 639px) 100%, (max-width: 1023px) 50vw, 33vw"
  //           src={image}
  //           alt={title}
  //           className="opacity-100 scale-100 transition-all ease-in-out duration-500 object-cover"
  //         />
  //       </div>
  //     </div>
  //     <footer className="flex items-center justify-between text-base font-headings  mt-4 px-2">
  //       <h2 className="font-headings tracking-tight text-base-tight 2xl:md-tight font-medium">
  //         {title}
  //       </h2>
  //     </footer>
  //   </Link>
  // );

  return (
    <div className="content-card">
      {/* <img src={image} alt={title} /> */}
      <div
        className="content-card-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="content-card-title">{title}</div>
    </div>
  );
};
