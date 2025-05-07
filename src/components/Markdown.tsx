// import type { FC } from "react";
// import ReactMarkdown, { Components } from "react-markdown";
// import rehypeRaw from "./../../node_modules/rehype-raw/lib/index";

// interface MarkDownProps {
//   content: string;
// }
// const Markdown: FC<MarkDownProps> = ({ content }) => {
//   const renderes: Components = {
//     h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
//     h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
//     h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
//     p: ({ children }) => <p className="text-base font-light">{children}</p>,
//     strong: ({ children }) => (
//       <strong className="font-bold text-primary">{children}</strong>
//     ),
//     em: ({ children }) => (
//       <em className="font-italic text-secondary">{children}</em>
//     ),
//     s: ({ children }) => (
//       <s className="line-through text-red-500">{children}</s>
//     ),
//   };
//   return (
//     <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderes}>
//       {content}
//     </ReactMarkdown>
//   );
// };

// export default Markdown;
