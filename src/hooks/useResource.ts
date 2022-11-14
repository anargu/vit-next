import { showDefaultNotification } from "../components/Notification/Notification";
import { Resource, VITResource } from "../core/entities";

export const useResource = () => {

  const share = (resource : Resource | VITResource) => {
    navigator.clipboard.writeText(resource?.url || "");

    showDefaultNotification("Link copied to Clipboard.");
  };

  return { share };
};
