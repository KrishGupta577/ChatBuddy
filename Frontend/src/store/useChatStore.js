import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const response = await axiosInstance.get("/messages/users")
            set({ users: response.data })
        } catch (error) {
            toast.error(error.response.data.messages)
        }
        finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: response.data })
        } catch (error) {
            toast.error(error.response.data.messages)
        }
        finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, response.data] })
        } catch (error) {
            toast.error(error.response.data.messages)
        }
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
    }
}))