import React from "react";
import { ReactElement } from "react";
import { memo } from "react";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/styles/MainLayout.module.css";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

async function bootstrap(url: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    method: "POST",
  });
}

export const MainLayout = memo(function MainLayout({
  children,
}: {
  children: ReactElement;
}) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const { trigger: boostrapTrigger } = useSWRMutation("/bootstrap", bootstrap);
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header bg="grape">
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm" w="100%">
                <UnstyledButton
                  className={classes.control}
                  component="a"
                  href="/"
                >
                  Properties
                </UnstyledButton>
                <UnstyledButton
                  className={classes.control}
                  component="a"
                  href="/createProperty"
                >
                  Create Properties
                </UnstyledButton>
                <Tooltip label="Add properties in bulk">
                  <Button
                    ml="auto"
                    color="red"
                    onClick={() => boostrapTrigger()}
                  >
                    Add properties
                  </Button>
                </Tooltip>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <UnstyledButton className={classes.control} component="a" href="/">
            Properties
          </UnstyledButton>
          <UnstyledButton
            className={classes.control}
            component="a"
            href="/createProperty"
          >
            Create Properties
          </UnstyledButton>
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
});

export function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}
