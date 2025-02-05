import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";



const NotificationItem = ({ id, type, message, onClose, duration = 5000 }:{id:number,type:string,message:string,onClose:any,duration:number}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer:NodeJS.Timeout;
    if (!isPaused && isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isPaused, isVisible, onClose, id, duration]);

  const getNotificationStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "error":
        return "bg-red-100 border-red-500 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      default:
        return "bg-blue-100 border-blue-500 text-blue-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <FaExclamationCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <FaExclamationTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        ${getNotificationStyles()}
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        transform transition-all duration-300 ease-in-out
        flex items-center justify-between
        px-4 py-3 rounded-lg shadow-lg border-l-4
        mb-3 max-w-md w-full
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center">
        <span className="mr-2">{getIcon()}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
        aria-label="Close notification"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

const NotificationContainer = ({typepro,messagepro,durationpro}:{typepro:string,messagepro:string,durationpro:number}) => {
  const [notifications, setNotifications] = useState<subset[]>([]);

  const addNotification = (type:string, message:string, duration:number) => {
    const id = Date.now();
    setNotifications((prev) =>[...prev, { id, type, message, duration }]);
  };

  const removeNotification = (id:number) => {
    setNotifications((prev) => prev.filter((notification:subset) => notification.id !== id));
  };

  // Example usage
  useEffect(() => {
    // Demo notifications
    setTimeout(() => addNotification(typepro,messagepro,durationpro), 1000);

  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2"
      role="region"
      aria-label="Notifications"
    >
      {notifications.map((notification:subset) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))
      }
    </div>
  );
};

type Notification={
    id:number,
    type:string,
     message:string,
     onClose:any,
     duration:number
}

export type subset=Pick<Notification, "duration" | "message" | "type" | "id">
export default NotificationContainer;