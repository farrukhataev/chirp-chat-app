import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Create a unique listener for this specific user
    const messageHandler = (newMessage) => {
      const { selectedUser: currentSelectedUser } = get();

      // Only add messages from the selected user to the chat
      if (
        currentSelectedUser &&
        newMessage.senderId === currentSelectedUser._id
      ) {
        console.log("💬 Новое сообщение добавлено в чат:", newMessage);
        set({
          messages: [...get().messages, newMessage],
        });
      }
    };

    // Store the handler for cleanup
    get()._messageHandler = messageHandler;
    socket.on("newMessage", messageHandler);
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    // Only remove the specific handler, not all newMessage listeners
    if (get()._messageHandler) {
      socket.off("newMessage", get()._messageHandler);
      get()._messageHandler = null;
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
