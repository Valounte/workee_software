import { Chip } from "@mui/material";

interface AlertType {
    alertType: string;
}

export const AlertBadge = (props: AlertType) => {
    const {alertType} = props;

    function defBadgeColor() {
        switch (alertType){
            case "URGENT_ALERT":
                return {color: "error", text: "Urgent"}

            case "IMPORTANT_ALERT":
                return {color: "warning", text: "Important"}

            case "NORMAL_ALERT":
                return {color: "success", text: "Normal"}
        }
    }

    if(defBadgeColor()?.color === "error") {
        return(
            <Chip label={defBadgeColor()?.text} color={"error"} size={"small"}/>
        );
    } else if (defBadgeColor()?.color === "warning") {
        return(
            <Chip label={defBadgeColor()?.text} color={"warning"} size={"small"}/>
        );
    } else if (defBadgeColor()?.color === "success") {
        return(
            <Chip label={defBadgeColor()?.text} color={"success"} size={"small"}/>
        );
    } else {
        return(
            <Chip label={defBadgeColor()?.text} color={"primary"} size={"small"}/>
        ); 
    }
}