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
        <ToolWindow title="Metadata Editor" closeDialog={closeDialog}
            isOpen={isOpen} buttons={buttons}>
        </ToolWindow>
    )
}

export default MetadataEditor;