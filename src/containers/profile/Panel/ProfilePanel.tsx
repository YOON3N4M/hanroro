import { cn } from "@/utils";
import { PanelProps, PanelTemplate, usePanel } from ".";

interface ProfilePanelProps extends PanelProps {}

function ProfilePanel(props: ProfilePanelProps) {
  const { activePanelIndex, panelIndex } = props;
  const { isPanelActive } = usePanel(activePanelIndex, panelIndex);

  return (
    <PanelTemplate isPanelActive={isPanelActive}>
      <div className={cn("size-full relative")}>
        <div className="w-[80vw] border tab:w-screen h-full absolute center flex gap-md">
          ProfilePanel
        </div>
      </div>
    </PanelTemplate>
  );
}

export default ProfilePanel;
