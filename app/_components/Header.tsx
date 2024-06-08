"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
  StarIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "@radix-ui/react-separator";

const Header = () => {
  const { data } = useSession();
  const handleSignOutClick = () => signOut();
  return (
    <div className="flex justify-between px-5 pt-6 ">
      <Link href={"/"}>
        <div className="relative h-[30px] w-[100px]">
          <Image src={"/logo.png"} alt="PratoPrime" fill />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            variant={"outline"}
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>

            {data?.user ? (
              <>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={data?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {data?.user?.name?.split(" ")[0][0]}
                        {data?.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="px-1">
                      <h3 className="text-left font-semibold">
                        {data?.user?.name}
                      </h3>
                      <span className="block text-xs text-muted-foreground">
                        {data?.user?.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-6">
                  <Separator className="color" />
                </div>

                <div className="space-y-2 ">
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  >
                    <HomeIcon /> <span className="block">Início</span>
                  </Button>

                  <Button
                    variant={"ghost"}
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                    asChild
                  >
                    <Link href={"/orders"}>
                      <ScrollTextIcon />{" "}
                      <span className="block">Meus pedidos</span>
                    </Link>
                  </Button>

                  <Button
                    variant={"ghost"}
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  >
                    <StarIcon />{" "}
                    <span className="block">Restaurantes favoritos</span>
                  </Button>
                </div>

                <div className="py-6">
                  <Separator />
                </div>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair da conta</span>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2>Olá, faça seu login</h2>
                  <Button onClick={() => signIn()}>
                    <LogInIcon className="px-1" /> Entrar
                  </Button>
                </div>

                <Separator />
              </>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
