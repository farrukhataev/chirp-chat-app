import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Аккаунт успешно создан");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Вход выполнен успешно");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Выход выполнен успешно");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Профиль успешно обновлен");
      return res.data;
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    // Show notification when user successfully connects
    socket.on("connect", () => {
      console.log("✅ Подключено к серверу");
      toast.success("✅ Подключено к чату");
    });

    // Listen for online users list updates
    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online users:", userIds);
      const previousUsers = get().onlineUsers;
      set({ onlineUsers: userIds });

      // Show notification for newly connected users (not on initial load)
      if (previousUsers.length > 0) {
        const newUsers = userIds.filter((id) => !previousUsers.includes(id));
        newUsers.forEach((userId) => {
          if (userId !== authUser._id) {
            toast.success("👤 Пользователь вошел в сеть");
          }
        });
      }
    });

    // Listen for user offline event
    socket.on("userOffline", (userId) => {
      console.log("User went offline:", userId);
      const currentOnlineUsers = get().onlineUsers;
      const updatedUsers = currentOnlineUsers.filter((id) => id !== userId);
      set({ onlineUsers: updatedUsers });
      
      // Show notification when user goes offline
      if (userId !== authUser._id) {
        toast.error("👋 Пользователь вышел из сети");
      }
    });

    // Global listener for incoming messages with real-time notification
    socket.on("newMessage", (newMessage) => {
      console.log("📨 Новое сообщение получено:", newMessage);
      const senderName = newMessage.senderName || "Неизвестный пользователь";
      const messagePreview = newMessage.text 
        ? newMessage.text.substring(0, 50) + (newMessage.text.length > 50 ? "..." : "")
        : "📸 Отправлена фотография";
      
      toast.success(
        `💬 ${senderName}: ${messagePreview}`,
        {
          duration: 4000,
          icon: "💬",
        }
      );
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  emitUserStatus: (status) => {
    const socket = get().socket;
    if (socket && socket.connected) {
      socket.emit("userStatusChange", { status });
    }
  },
}));

// expose store for debugging in dev
if (import.meta.env.DEV) {
  window.__useAuthStore = useAuthStore;
}
