import { cn } from "@/utils";
import ModalTemplate from "../ModalTemplate";

interface MessageModalProps {
  messageList: string[];
  textAlign?: "left" | "center";
}

function MessageModal(props: MessageModalProps) {
  const { messageList, textAlign } = props;

  return (
    <ModalTemplate>
      <div className="min-w-[300px] text-sm mo:min-w-[80vw]">
        <p className={cn(textAlign === "center" && "text-center")}>
          {messageList.map((msg, idx) => (
            <>
              {idx !== 0 && <br />}
              {msg}
            </>
          ))}
        </p>
      </div>
    </ModalTemplate>
  );
}

export default MessageModal;
