import { Flex } from "@radix-ui/themes";
import VerticalNavBar from "./VerticalNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <Flex className="w-full h-full p-5" gap={"2"}>
        {/* <Flex className="w-96 border rounded-lg bg-white"></Flex> */}
        <VerticalNavBar />
        <Flex className="w-full">{children}</Flex>
      </Flex>
    </main>
  );
}
