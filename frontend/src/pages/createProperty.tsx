import { getLayout } from "@/shared/components/layouts/MainLayout";
import { Button, Flex, Input, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

function Content() {
  const { data: createBookingData, trigger: createPropertyTrigger } =
    useSWRMutation("/properties", createProperty, {
      onSuccess() {
        setSuccess(true);
        setName("");
        setLocation("");
        setPricePerNight(0);
      },
    });
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
      mb="3rem"
      gap="lg"
    >
      <Title order={1}>Create Property</Title>
      <Flex direction="column" gap="md" w="30%">
        <Input.Wrapper label="Name">
          <TextInput
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value || "")}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Location">
          <TextInput
            placeholder="Location"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value || "")}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Price per night">
          <TextInput
            placeholder="Price per night"
            value={pricePerNight}
            onChange={(event) =>
              setPricePerNight(parseInt(event.currentTarget.value || "0"))
            }
          />
        </Input.Wrapper>
        <Button
          color="grape"
          fullWidth
          onClick={() =>
            createPropertyTrigger({ name, location, pricePerNight })
          }
        >
          Create
        </Button>
        {success && (
          <Text c="green" size="sm">
            Property created successfully
          </Text>
        )}
        {createBookingData?.error && (
          <Text c="red" size="sm">
            {createBookingData.message.join(", ") || createBookingData.error}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

type CreatePropertyDto = {
  name: string;
  location: string;
  pricePerNight: number;
};

async function createProperty(
  url: string,
  { arg }: { arg: CreatePropertyDto }
) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const Page = () => {
  return <Content />;
};

Page.getLayout = getLayout;

export default Page;
