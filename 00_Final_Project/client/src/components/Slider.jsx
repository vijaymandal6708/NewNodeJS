import { useEffect, useRef, useState } from "react";

const Slider = () => {
  const carouselRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const SLIDE_TIME = 3000; // 3 seconds
  const STEP = 30;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let timer;

    const startProgress = () => {
      clearInterval(timer);
      setProgress(0);

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + (STEP / SLIDE_TIME) * 100;
        });
      }, STEP);
    };

    const carousel = carouselRef.current;
    carousel.addEventListener("slid.bs.carousel", startProgress);

    startProgress();

    return () => {
      clearInterval(timer);
      carousel.removeEventListener("slid.bs.carousel", startProgress);
    };
  }, []);

  const dashOffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="container mt-4 position-relative">
      {/* Carousel */}
      <div
        ref={carouselRef}
        id="circleSlider"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div
              key={num}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={`offer${num}.jpg`}
                className="d-block w-100" 
                style={{height:"500px"}}
                alt={`slide-${num}`}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#circleSlider"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        {/* Right Arrow */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#circleSlider"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Circular Timer */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          width: "45px",
          height: "45px",
        }}
      >
        <svg width="45" height="45">
          <circle
            cx="22.5"
            cy="22.5"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="4"
          />
          <circle
            cx="22.5"
            cy="22.5"
            r={radius}
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.03s linear" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Slider;
