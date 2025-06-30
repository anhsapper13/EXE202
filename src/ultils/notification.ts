import { NotificationArgsProps, notification } from "antd";

type NotificationType = "success" | "error";
type NotificationPlacement = NotificationArgsProps["placement"];

export const openNotificationWithIcon = (
  type: NotificationType,
  message: string,
  description: string,
  placement: NotificationPlacement = "topRight"
) => {
  notification[type]({
    message,
    description,
    placement,
    duration: 3,
  });
};
