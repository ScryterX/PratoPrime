import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6 ">
      <Link href={"/"}>
        <div className="relative h-[30px] w-[100px]">
          <Image src={"/logo.png"} alt="PratoPrime" fill />
        </div>
      </Link>
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
