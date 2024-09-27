import Head from "next/head";
import { getLayout } from "@/shared/components/layouts/MainLayout";
import { Flex, Loader, Text, Title } from "@mantine/core";
import { NextPageWithLayout } from "./_app";
import useSWR from "swr";
import { fetcher } from "@/shared/fetcher";
import { PropertyCard } from "@/shared/components/PropertyCard";

function Home() {
  const { data, error, isLoading } = useSWR<Property[]>("/properties", fetcher);
  return (
    <>
      <Head>
        <title>Property Booking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        gap="xl"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        mb="3rem"
      >
        <Title order={1}>Property Booking</Title>
        {!isLoading && <Text>Showing all properties</Text>}
        {error && <Text>Failed to load properties</Text>}
      </Flex>
      <Flex
        gap="xl"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {isLoading && <Loader color="grape" size="xl" />}
        {data?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </Flex>
    </>
  );
}

const Page: NextPageWithLayout<unknown> = () => {
  return <Home />;
};

Page.getLayout = getLayout;

export default Page;
