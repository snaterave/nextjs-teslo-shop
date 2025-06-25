import Link from "next/link";

interface Props {
  href: string;
  icon: React.ReactNode;
  name: string;
  close: () => void;
}
export const SidebarItems = ({ href, icon, name, close }: Props) => {
  return (
    <Link
      href={href}
      onClick={() => close()}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {/* <IoTicketOutline size={20} /> */}
      {icon}
      <span className="ml-3 text-sm">{name}</span>
    </Link>
  );
};
