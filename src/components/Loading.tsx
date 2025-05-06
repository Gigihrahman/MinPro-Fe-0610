import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Music, Star } from "lucide-react";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  // Event-themed icons that will animate in sequence
  const eventIcons = [
    { icon: Calendar, color: "text-purple-600" },
    { icon: Clock, color: "text-purple-700" },
    { icon: Users, color: "text-purple-500" },
    { icon: Music, color: "text-purple-600" },
    { icon: Star, color: "text-purple-800" },
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    // Icon rotation animation
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % eventIcons.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(iconInterval);
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-purple-50">
      <div className="w-64 flex flex-col items-center gap-6">
        {/* Ticket-shaped container */}
        <div className="relative w-full h-40 bg-white rounded-lg shadow-lg border-2 border-purple-300 flex items-center justify-center overflow-hidden">
          {/* Ticket notches */}
          <div className="absolute left-0 w-6 h-6 bg-purple-50 rounded-full -translate-x-1/2"></div>
          <div className="absolute right-0 w-6 h-6 bg-purple-50 rounded-full translate-x-1/2"></div>
          <div className="absolute left-0 w-6 h-6 bg-purple-50 rounded-full -translate-x-1/2 bottom-0"></div>
          <div className="absolute right-0 w-6 h-6 bg-purple-50 rounded-full translate-x-1/2 bottom-0"></div>

          {/* Dotted line */}
          <div className="absolute left-0 top-0 h-full border-r-2 border-dashed border-purple-300 ml-6"></div>

          {/* Event icon animation */}
          <div className="flex flex-col items-center justify-center ml-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {eventIcons.map((iconInfo, index) => {
                const IconComponent = iconInfo.icon;
                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ${iconInfo.color}`}
                    style={{
                      opacity: currentIcon === index ? 1 : 0,
                      transform:
                        currentIcon === index ? "scale(1)" : "scale(0.5)",
                    }}
                  >
                    <IconComponent size={48} />
                  </div>
                );
              })}

              {/* Decorative elements */}
              <div
                className="absolute w-full h-full border-4 border-dotted border-purple-200 rounded-full animate-spin"
                style={{ animationDuration: "10s" }}
              ></div>
              <div className="absolute w-8 h-8 bg-purple-100 rounded-full opacity-80 animate-ping"></div>
            </div>

            <h3 className="mt-2 font-bold text-purple-800">Loading Event</h3>
          </div>

          {/* Confetti particles */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rotate-45"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
            style={{ width: `${progress}%`, transition: "width 0.1s ease-out" }}
          ></div>
        </div>

        <p className="text-purple-700 font-medium text-sm">
          Preparing your amazing event...
        </p>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(45deg);
          }
          100% {
            transform: translateY(160px) rotate(405deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
