/*eslint-disable @typescript-eslint/no-explicit-any*/

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function sendInvite(
  groupId: string,
  senderId: string,
  receiverIds: string[]
) {
  const inviteId = uuidv4();

  try {
    const response = await axios.post("/api/invites/send", {
      inviteId,
      groupId,
      senderId,
      receiverIds,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function respondToInvite(
  inviteId: string,
  userId: string,
  status: "accepted" | "declined"
) {
  try {
    const response = await axios.post("/api/invites/respond", {
      inviteId,
      userId,
      status,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error responding to invite:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
