import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl w-full px-4 py-8 mx-auto">
        <div className="text-4xl font-bold">
          <h1 className="w-full md:w-2/3 text-lime-600">
            How can we help you? Get in touch
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-4">
          <p className="w-full md:w-2/3  text-gray-400">
            If you have any questions, feedback, or need assistance regarding
            our conference tracking website, we are here to help. Our dedicated
            support team is available to address any concerns you may have.
            Whether you need help navigating the website, finding specific
            conference information, or have suggestions for improvement, feel
            free to get in touch with us. We value your input and strive to
            provide the best user experience possible. Contact us today to
            explore how we can assist you!
          </p>
          <div className="flex flex-col mt-8 md:flex-row md:justify-between">
            <div className="">
              <p>Follow us on social media:</p>
              <div className="flex mt-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:text-blue-500"
                >
                  <FaFacebookF className="text-blue-500 text-xl" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:text-blue-300"
                >
                  <FaTwitter className="text-blue-300 text-xl" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500"
                >
                  <FaInstagram className="text-pink-500 text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left text-lg mt-8">
          <div className="col-span-1">
            <strong className="font-medium text-lime-600">About</strong>
            <nav
              aria-label="Footer About Nav"
              className="mt-4 flex flex-col space-y-2"
            >
              <a
                className="text-white transition hover:text-gray-300"
                href="/about"
              >
                Mission
              </a>
              <a
                className="text-white transition hover:text-gray-300"
                href="/about"
              >
                Vision
              </a>
              <a
                className="text-white transition hover:text-gray-300"
                href="/about"
              >
                Values
              </a>
              <a
                className="text-white transition hover:text-gray-300"
                href="/about"
              >
                Our Team
              </a>
            </nav>
          </div>
          <div className="col-span-1">
            <strong className="font-medium text-lime-600">Services</strong>
            <nav
              aria-label="Footer Services Nav"
              className="mt-4 flex flex-col space-y-2"
            >
              <a className="text-white transition hover:text-gray-300" href="/conferences">
                Upcoming Conferences
              </a>
              <a className="text-white transition hover:text-gray-300" href="/conferences">
                Ongoing Conferences
              </a>
              <a className="text-white transition hover:text-gray-300" href="/conferences">
                Past Conferences
              </a>
            </nav>
          </div>
          <div className="col-span-1 flex justify-center">
            <div>
              <strong className="font-medium text-lime-600">Contact</strong>
              <nav
                aria-label="Footer Contact Nav"
                className="mt-4 flex flex-col space-y-2"
              >
                <div className="flex items-center">
                  <FaEnvelope className="text-lime-600 text-xl mr-3" />
                  <p className="text-white">Email: contact@example.com</p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-lime-600 text-xl mr-3" />
                  <p className="text-white">Phone: +1234567890</p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-lime-600 text-xl mr-3" />
                  <p className="text-white">Location: Nairobi, Kenya</p>
                </div>
              </nav>
            </div>
          </div>

          <div className="col-span-1">
            <strong className="font-medium text-lime-600">Location</strong>
            <div className="mt-4 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9645684044293!2d36.82194621432585!3d-1.2863898359937736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f18278c0e30ef%3A0xa3e1845113ef4b60!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1622132022756!5m2!1sen!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white-500 pt-8">
          <p className="text-center text-m/relaxed text-lime-600">
            © ConferenceHub 2023. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
