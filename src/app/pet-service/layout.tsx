"use client";

export default function PetServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pet-service-layout">
      {children}
    </div>
  );
}