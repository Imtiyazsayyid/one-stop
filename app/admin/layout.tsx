import { Flex } from "@radix-ui/themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <Flex className="w-full p-10 h-full" gap={"2"}>
        {/* <Flex className="w-96 border rounded-lg bg-white"></Flex> */}
        <Flex className="w-full">{children}</Flex>
      </Flex>
    </main>
  );
}
