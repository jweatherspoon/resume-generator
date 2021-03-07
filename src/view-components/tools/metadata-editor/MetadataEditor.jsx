import ToolWindow from "../ToolWindow";

const MetadataEditor = ({isOpen, closeDialog}) => {
    const buttons = [
        {
            content: "Save Changes",
            action: () => {
                alert("saved!");
                closeDialog();
            }
        }
    ]

    return (
        <ToolWindow title="Metadata Editor" onClose={closeDialog}
            isOpen={isOpen} buttons={buttons}>
        </ToolWindow>
    )
}

export default MetadataEditor;