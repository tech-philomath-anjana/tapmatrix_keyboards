import Image from "next/image";

export function LogoMark(
  props: Omit<React.ComponentProps<typeof Image>, "src" | "alt">,
) {
  return <Image src="/icon.png" alt="Logo" {...props} />;
}
