import { useState } from "react";
import NumberEditor from "../editors/NumberEditor";
import StringEditor from "../editors/StringEditor";
import ModalDialog from "./ModalDialog";

export const DatabaseConnectDialog = (props) => {
    const {
        isOpen,
        onConnect,
        closeDialog,
    } = props;

    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState(27017);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const canConnect = () => host && (port > 0 && port < 65536);

    const buttons = [
        {
            content: "Cancel",
            action: () => closeDialog(),
        },
        {
            content: "Connect",
            action: () => onConnect(`mongodb://${host}:${port}`),
            isDisabled: () => !canConnect()
        }
    ];

    return (
        <ModalDialog title="Connect" buttons={buttons} isOpen={isOpen} maxWidth="sm">
            <StringEditor value={host} onValueChanged={(o, n) => setHost(n)} attributes={{ label: "Host" }} />
            <NumberEditor value={port} onValueChanged={(o, n) => setPort(n)} attributes={{ label: "Port" }} />
            <StringEditor value={user} onValueChanged={(o, n) => setUser(n)} attributes={{ label: "User" }} />
            <StringEditor value={password} onValueChanged={(o, n) => setPassword(n)} attributes={{ label: "Password" }} />
        </ModalDialog>
    )
}