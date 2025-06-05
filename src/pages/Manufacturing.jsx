// Manufacturing.jsx
import React from "react";

export default function Manufacturing() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a Manufacturing Appointment</h1>
      <p className="mb-4">
        Please fill out the form below to schedule a consultation about your manufacturing needs.
      </p>

      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name" required className="border p-2 rounded" />
        <input type="email" placeholder="Email Address" required className="border p-2 rounded" />
        <input type="tel" placeholder="Phone Number" required className="border p-2 rounded" />
        <textarea placeholder="Describe your manufacturing needs" rows={5} required className="border p-2 rounded" />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
