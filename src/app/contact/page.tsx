import BreadCrumb, { BreadcrumbItem } from "@/components/common/BreadCrumb";
import ContactAddress from "@/components/contact/ContactAddress";
import ContactForm from "@/components/contact/ContactForm";

export default function Page() {
  const lists: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex justify-left items-center bg-gray-100 p-4 shadow-md">
        <BreadCrumb lists={lists} />
      </div>

      {/* Changed padding and height for mobile */}
      <div className="relative p-4 md:p-20 w-full shadow-2xl min-h-[500px] md:min-h-[700px]">
        <div className="absolute inset-0 bg-[url('https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*')] bg-center bg-cover">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full w-full">
          <div className="w-full max-w-6xl px-4">
            {/* Responsive text sizing */}
            <h1 className="text-orange-100 text-center font-bold text-2xl md:text-3xl mb-2">
              CONTACT US
            </h1>
            <h5 className="text-white text-center font-normal text-sm md:text-lg mb-6 md:mb-10">
              Feel free to use the form or drop us an email. Old-fashioned phone
              calls work too.
            </h5>

            {/* Grid layout for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <ContactAddress />
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
