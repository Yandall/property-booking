import { getLayout } from "@/shared/components/layouts/MainLayout";
import { fetcher } from "@/shared/fetcher";
import {
  Button,
  Container,
  Flex,
  Image,
  Loader,
  NumberFormatter,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

function Content() {
  const router = useRouter();
  const { id: idProperty } = router.query;
  const {
    data: property,
    isLoading,
    error: notFoundProperty,
  } = useSWR<Property>(`/properties/${idProperty}`, fetcher);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [customerName, setCustomerName] = useState<string>("");
  const { data: bookings, mutate: mutateBookings } = useSWR<Booking[]>(
    `/properties/${idProperty}/bookings`,
    fetcher
  );
  const { data: createBookingData, trigger: createBookingTrigger } =
    useSWRMutation(`/properties/${idProperty}/book`, bookProperty);

  const { trigger: deletePropertyTrigger } = useSWRMutation(
    `/properties/${idProperty}`,
    deleteProperty,
    {
      onSuccess: () => router.push("/"),
    }
  );
  return (
    <>
      {isLoading && <Loader color="grape" size="xl" />}
      {notFoundProperty && <div>Failed to load property</div>}
      {property && (
        <Flex
          w="100%"
          justify="center"
          align="flex-start"
          direction="column"
          wrap="wrap"
          mb="3rem"
          gap="xl"
        >
          <Image
            src="https://s3.amazonaws.com/st1.itrip.net/upload/720/0211316_orion_dr_virtual_twilight2.1718821435.jpg"
            mah={320}
            alt="Norway"
          />
          <Flex direction="row" w="100%">
            <Flex ml="md" w="50%" direction="column" align="flex-start">
              <Title order={1}>{property.name}</Title>
              <Text>Location: {property.location}</Text>
              <Text>
                Price per night:{" "}
                <NumberFormatter
                  prefix="$"
                  thousandSeparator
                  value={property.pricePerNight}
                />
              </Text>
              <Button color="red" onClick={() => deletePropertyTrigger()}>
                Delete Property
              </Button>
            </Flex>
            <Flex direction="column" gap="md">
              <TextInput
                placeholder="Customer name"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.currentTarget.value || "")
                }
              ></TextInput>
              <DatePicker
                type="range"
                value={dateRange}
                onChange={setDateRange}
              />

              <Button
                color="grape"
                fullWidth
                mt="md"
                radius="md"
                onClick={() =>
                  createBookingTrigger({ customerName, dateRange })
                }
              >
                Book now
              </Button>
              {createBookingData?.error && (
                <Text c="red" size="sm" maw="15rem">
                  {createBookingData.message || createBookingData.error}
                </Text>
              )}
            </Flex>
          </Flex>
          <Title order={3}>Bookings</Title>
          <Flex direction="row" gap="md">
            {bookings?.map((booking) => (
              <Container key={booking.id} mb="md">
                <Flex direction="column" justify="space-between">
                  <Text>{booking.customerName}</Text>
                  <Text>
                    {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </Text>
                  <Text>
                    Total price:{" "}
                    <NumberFormatter
                      prefix="$"
                      thousandSeparator
                      value={booking.totalPrice}
                    />
                  </Text>
                </Flex>
              </Container>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
}

async function bookProperty(
  url: string,
  {
    arg,
  }: { arg: { dateRange: [Date | null, Date | null]; customerName: string } }
) {
  const { dateRange, customerName } = arg;
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerName: customerName?.trim(),
      checkIn: dateRange[0],
      checkOut: dateRange[1],
    }),
  }).then((res) => res.json());
}

async function deleteProperty(url: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

const Page = () => {
  return <Content />;
};

Page.getLayout = getLayout;

export default Page;
