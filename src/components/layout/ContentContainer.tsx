import { cn } from "@/lib/utils";

interface ContentContainerProps extends React.ComponentProps<"div"> {
  as?: "div" | "section" | "article";
}

export function ContentContainer({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContentContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-(--content-max-width) min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
