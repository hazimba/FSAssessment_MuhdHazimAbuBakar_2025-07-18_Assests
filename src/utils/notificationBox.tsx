import React, { useEffect } from "react";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const iconMap = {
  success: <CheckCircleOutlined className="text-green-600" />,
  error: <CloseCircleOutlined className="text-red-600" />,
  warning: <WarningOutlined className="text-yellow-600" />,
  info: <InfoCircleOutlined className="text-blue-600" />,
};

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration: number;
  onClose?: () => void;
}

export default function NotificationBox({
  message,
  type,
  duration,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-[9999] bg-white border shadow-lg rounded-md px-4 py-3 flex items-center space-x-3 animate-fade-in-down">
      {iconMap[type]}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
