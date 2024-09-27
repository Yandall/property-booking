import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Image,
  NumberFormatter,
} from "@mantine/core";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw="22rem">
      <Card.Section>
        <Image
          src="https://s3.amazonaws.com/st1.itrip.net/upload/720/0211316_orion_dr_virtual_twilight2.1718821435.jpg"
          height={320}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} size="xl">
          {property.name}
        </Text>
        <Badge color="indigo" size="lg">
          <NumberFormatter
            prefix="$"
            thousandSeparator
            value={property.pricePerNight}
          />
        </Badge>
      </Group>

      <Text size="md">Location: {property.location}</Text>

      <Button
        color="grape"
        fullWidth
        mt="md"
        radius="md"
        component="a"
        href={`/bookings/${property.id}`}
      >
        Book now
      </Button>
    </Card>
  );
}
