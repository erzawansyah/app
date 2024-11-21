"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface EventNotificationProps {
    apiUrl?: string; // Opsional: URL API untuk fetch data event
}

const EventNotification: React.FC<EventNotificationProps> = ({ apiUrl }) => {
    const [isEventOngoing, setIsEventOngoing] = useState(false);
    const [eventTitle, setEventTitle] = useState("");

    useEffect(() => {
        // Simulasi fetch data event
        const fetchEvent = async () => {
            // Jika menggunakan API:
            if (apiUrl) {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (data.isOngoing) {
                        setIsEventOngoing(true);
                        setEventTitle(data.title);
                    }
                } catch (error) {
                    console.error("Failed to fetch event data:", error);
                }
            } else {
                // Simulasi data event
                const ongoingEvent = {
                    isOngoing: true,
                    title: "Promo Akhir Tahun! Diskon 50% untuk Semua Buku",
                };

                if (ongoingEvent.isOngoing) {
                    setIsEventOngoing(true);
                    setEventTitle(ongoingEvent.title);
                }
            }
        };

        fetchEvent();
    }, [apiUrl]);

    // Render hanya jika ada event
    if (!isEventOngoing) {
        return null;
    }

    return (
        <div className="w-full max-w-md mb-6 p-4 bg-yellow-300 border-4 border-black rounded-lg shadow-md text-center">
            <h2 className="text-lg font-extrabold text-black flex justify-center items-center">
                🎉 Event Sedang Berlangsung!
            </h2>
            <p className="mt-2 text-sm text-black">{eventTitle}</p>
            <Link
                href="/events"
                className="mt-4 block w-full text-center bg-primary text-white font-bold text-sm py-2 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
            >
                Lihat Detail Event
            </Link>
        </div>
    );
};

export default EventNotification;
