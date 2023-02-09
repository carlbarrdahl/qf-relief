import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

export const Markdown = (props: ReactMarkdownOptions) => (
  <ReactMarkdown className={"prose"} {...props} />
);
