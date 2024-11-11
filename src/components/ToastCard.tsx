import { IoMdCheckboxOutline } from "react-icons/io";

interface ToastCardProps {
  text: string;
  color: string;
}

export default function ToastCard({ text, color }: ToastCardProps) {
  return (
    <div>
      <div className="toast">
        <div className={`alert flex text-white ${color}`}>
          <IoMdCheckboxOutline className="text-2xl" />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
