import { useLoaderData } from "react-router-dom";

const BookedDetails = () => {
    const booked = useLoaderData()
console.log(booked);
    return (
        <div>
            hi
        </div>
    );
};

export default BookedDetails;