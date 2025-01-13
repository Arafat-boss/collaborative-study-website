import bannerImg from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="bg-black bg-opacity-60 p-8 md:p-12 lg:p-16 rounded-lg max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold">
          Welcome to the{" "}
          <span className="text-orange-400">Collaborative Learning Platform</span>
        </h1>
        <p className="mt-4 text-base md:text-lg lg:text-xl">
          Our platform is built to empower collaborative education. With tools for session scheduling, resource sharing, and user management, 
          we simplify the way you learn and teach. Join us to enhance collaboration, access essential study materials, and streamline your academic tasks.
        </p>
        <button className="mt-6 btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default Banner;
