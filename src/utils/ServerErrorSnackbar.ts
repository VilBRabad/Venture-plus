import { isAxiosError } from "axios";
import Snackbar from "react-native-snackbar";

function showError(error: Error) {
    if (isAxiosError(error)) {
        const serverMessage = error.response?.data.message || "An error occurred";

        Snackbar.show({
            text: serverMessage,
            backgroundColor: "#C70039"
        });
    } else {
        Snackbar.show({
            text: error.message || "Unknown error",
            backgroundColor: "#C70039"
        });
    }
}

export default showError;

