import TrekList from "../components/TrekList/TrekList";
import TrekDetails from "../components/TrekDetails/TrekDetails";
import BookingForm from "../components/BookingForm/BookingForm";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Trek Booking</h1>
      <TrekList />
      <TrekDetails 
        name="Everest Base Camp" 
        description="A challenging trek to the Everest Base Camp in Nepal." 
        price={1200} 
      />
      <BookingForm />
    </div>
  );
}
