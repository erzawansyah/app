"use client";

import QRCode from "qrcode";
import React, { useEffect, useRef } from "react";

interface QRCodeGeneratorProps {
    value: string; // Nilai untuk QR Code
    size?: number; // Ukuran QR Code (default: 200px)
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, size = 200 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            // Generate QR Code ke elemen canvas
            QRCode.toCanvas(canvasRef.current, value, { width: size }, (error) => {
                if (error) console.error("QR Code Generation Error:", error);
            });
        }
    }, [value, size]);

    return (
        <div className="flex justify-center items-center">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default QRCodeGenerator;
