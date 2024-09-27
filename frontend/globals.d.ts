type Property = {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  availabilityStart: Date;
  availabilityEnd: Date;
};

type Booking = {
  id: number;
  customerName: string;
  property: Property;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
};
