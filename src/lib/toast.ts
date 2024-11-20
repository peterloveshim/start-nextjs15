import { ExternalToast, toast } from "sonner";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

type Props = {
  type?: ToastType;
  message: string;
  description?: string;
  action?: {
    label: string | null;
    onClick: any;
  };
};

const TYPE_STYLE = {
  [ToastType.SUCCESS]: {
    borderColor: "blue",
  },
  [ToastType.ERROR]: {
    borderColor: "red",
  },
  [ToastType.INFO]: {
    borderColor: "",
  },
  [ToastType.WARNING]: {
    borderColor: "orange",
  },
};

export const customToast = ({
  type = ToastType.INFO,
  message,
  description,
  action,
}: Props) => {
  const option: ExternalToast = {
    duration: 3000,
    description,
    style: {
      ...TYPE_STYLE[type],
    },
    className: "border-2",
  };

  if (action) {
    option.action = action;
  }

  toast(message, option);
};
