import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import freelanceImg from "../assets/images/freelancer.png";
import clientImg from "../assets/images/client.png";
import Loader from "../components/Loader";
import FreelancerNavbar from "../components/FreelancerNavbar";
import ClientNavbar from "../components/ClientNavbar";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import conversationImg from "../assets/images/conversation.svg";
import { SendSharp } from "react-ionicons";
import { io } from "socket.io-client";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Messenger = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [clientData, setClientData] = useState(user || null);
  const [searchFreelancer, setSearchFreelancer] = useState("");
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [filteredList, setFilteredList] = useState([]);
  const [showChats, setShowChats] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [lastMessages, setLastMessages] = useState({});
  const [freelancerId, setfreelancerId] = useState("");

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const currentRoomRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      setfreelancerId(id);
    }
  }, [location.search]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const determineUserRole = (user) => {
    const userIs = user?.role;
    let targetRole = "";

    if (userIs === "client") {
      targetRole = "freelancer";
    } else if (userIs === "freelancer") {
      targetRole = "client";
    }

    setRole(targetRole);

    if (freelancerId) {
      getUserList(null, freelancerId);
    } else {
      getUserList(targetRole);
    }
  };

  const getUserList = async (targetRole, singleUserId = null) => {
    setLoading(true);

    try {
      const requestBody = singleUserId
        ? { singleUserId }
        : { role: targetRole };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/getuser`,
        requestBody,
        { withCredentials: true }
      );

      const fetchedUsers = response?.data?.fetchUser || [];
      setUsersList(fetchedUsers);

      const initialOnlineUsers = new Set();
      fetchedUsers.forEach((user) => {});
      setOnlineUsers(initialOnlineUsers);
    } catch (error) {
      console.error("Error fetching users list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.userId) return;

    const newSocket = io(
      process.env.REACT_APP_BACKEND_URI || "http://localhost:3000",
      {
        withCredentials: true,
        transports: ["websocket", "polling"],
        timeout: 20000,
      }
    );

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setIsConnected(true);
      newSocket.emit("addUser", user.userId);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("receiveMessage", (msg) => {
      console.log("Received message:", msg);

      const currentRoom = currentRoomRef.current;
      if (currentRoom && msg.roomId === currentRoom) {
        setMessages((prev) => {
          const messageExists = prev.some(
            (existingMsg) =>
              existingMsg.messageId === msg.messageId ||
              (existingMsg.senderId === msg.senderId &&
                existingMsg.textMessage === msg.textMessage &&
                Math.abs(
                  new Date(existingMsg.timestamp) - new Date(msg.timestamp)
                ) < 1000)
          );

          if (messageExists) {
            return prev;
          }

          return [...prev, { ...msg, fromSelf: false }];
        });
      }

      setLastMessages((prev) => ({
        ...prev,
        [msg.senderId]: {
          text: msg.textMessage,
          timestamp: msg.timestamp,
        },
      }));
    });

    newSocket.on("messageSent", (confirmation) => {
      console.log("Message sent confirmation:", confirmation);
    });

    newSocket.on("userStatusUpdate", ({ userId, status, timestamp }) => {
      console.log(`User ${userId} is now ${status}`);
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        if (status === "online") {
          newSet.add(userId);
        } else if (status === "offline") {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    newSocket.on("userJoinedRoom", ({ userId, roomId }) => {
      console.log(`User ${userId} joined room ${roomId}`);
      setOnlineUsers((prev) => new Set(prev).add(userId));
    });

    newSocket.on("userLeftRoom", ({ userId, roomId }) => {
      console.log(`User ${userId} left room ${roomId}`);
    });

    newSocket.on("userRegistered", ({ userId, socketId }) => {
      console.log(`User ${userId} registered with socket ${socketId}`);
      newSocket.emit("updateStatus", "online");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("updateStatus", "offline");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user?.userId]);

  useEffect(() => {
    if (!socket || !activeUser?.userId) {
      currentRoomRef.current = null;
      return;
    }

    const roomId = [user.userId, activeUser.userId].sort().join("-");
    currentRoomRef.current = roomId;

    socket.emit("joinRoom", roomId);
    loadMessages(activeUser.userId);

    return () => {
      if (currentRoomRef.current) {
        socket.emit("leaveRoom", currentRoomRef.current);
        currentRoomRef.current = null;
      }
    };
  }, [activeUser?.userId, socket]);

  const loadMessages = async (receiverId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/messages/${user.userId}/${receiverId}`,
        { withCredentials: true }
      );
      const messages = response.data.messages || [];
      setMessages(messages);

      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        setLastMessages((prev) => ({
          ...prev,
          [receiverId]: {
            text: lastMessage.textMessage,
            timestamp: lastMessage.timestamp,
          },
        }));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
    }
  };

  const handleMessageSend = () => {
    if (!textMessage.trim() || !socket || !activeUser?.userId || !isConnected)
      return;

    const messageId = `msg_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    const roomId = [user.userId, activeUser.userId].sort().join("-");

    const newMessage = {
      messageId,
      senderId: user.userId,
      receiverId: activeUser.userId,
      textMessage: textMessage.trim(),
      timestamp,
      roomId,
    };

    setMessages((prev) => [...prev, { ...newMessage, fromSelf: true }]);

    setLastMessages((prev) => ({
      ...prev,
      [activeUser.userId]: {
        text: newMessage.textMessage,
        timestamp: newMessage.timestamp,
      },
    }));

    socket.emit("sendMessage", newMessage);

    setTextMessage("");
  };

  useEffect(() => {
    if (!user) return;
    setClientData(user);
    determineUserRole(user);
  }, [user]);

  const getProfilePic = (users) => {
    const profilePicUrl = users?.profile?.profilePic
      ? `${process.env.REACT_APP_BACKEND_URI}/profilePics/${users?.profile?.profilePic}`
      : users?.role === "freelancer"
      ? freelanceImg
      : clientImg;
    return profilePicUrl;
  };

  const handleActiveUser = (users) => {
    setShowChats(true);
    setActiveUser(users);
  };

  const handleProfileRoute = () => {
    navigate(`/profile?id=${activeUser?.userId}`);
  };

  const filterUsers = (text) => {
    if (!text.trim()) {
      setFilteredList([]);
      return;
    }

    const filteredUsers = usersList.filter((user) =>
      user.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filteredUsers);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchFreelancer(value);
    filterUsers(value);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
  };

  return (
    <div className="w-full">
      {loading && <Loader />}

      {user?.role === "freelancer" ? (
        <FreelancerNavbar />
      ) : (
        <ClientNavbar isVisible={true} />
      )}

      <div className="w-full h-[calc(100vh-80px)] flex flex-row">
        <div
          className={`w-full md:w-1/3 ${
            showChats ? "hidden md:flex" : "flex"
          } flex-col border-r border-[#d7d7d7] overflow-y-auto`}
        >
          <div className="w-full flex flex-row items-center p-3 md:p-5 sticky top-0 bg-white z-10">
            <MagnifyingGlassIcon className="size-6 absolute left-8 text-gray-500" />
            <input
              type="text"
              placeholder={
                user?.role === "freelancer"
                  ? `Search Clients...`
                  : `Search Freelancers...`
              }
              className="w-full p-2 pl-12 font-medium border-2 border-[#d7d7d7] outline-none rounded-xl"
              onChange={handleSearchChange}
              value={searchFreelancer}
            />
          </div>

          {!isConnected && (
            <div className="px-5 py-2 bg-yellow-100 text-yellow-800 text-sm flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              Connecting...
            </div>
          )}

          <div className="flex flex-col w-full mt-1.5 gap-3">
            {searchFreelancer.length > 0 ? (
              filteredList.length > 0 ? (
                filteredList.map((users, index) => (
                  <UserListItem
                    key={users.userId || index}
                    user={users}
                    activeUser={activeUser}
                    getProfilePic={getProfilePic}
                    onlineUsers={onlineUsers}
                    lastMessages={lastMessages}
                    formatTime={formatTime}
                    isUserOnline={isUserOnline}
                    handleActiveUser={handleActiveUser}
                  />
                ))
              ) : (
                <div className="text-center w-full py-10 text-gray-500 font-medium">
                  <h1>
                    {user?.role === "freelancer"
                      ? `No Clients found`
                      : `No Freelancers found`}
                  </h1>
                </div>
              )
            ) : (
              usersList?.map((users, index) => (
                <UserListItem
                  key={users.userId || index}
                  user={users}
                  activeUser={activeUser}
                  getProfilePic={getProfilePic}
                  handleActiveUser={handleActiveUser}
                  onlineUsers={onlineUsers}
                  lastMessages={lastMessages}
                  formatTime={formatTime}
                  isUserOnline={isUserOnline}
                />
              ))
            )}
          </div>
        </div>

        <div className={`${showChats ? "flex" : "hidden md:flex"} w-full`}>
          {activeUser?.userId ? (
            <div className="w-full flex flex-col h-full">
              <div className="flex flex-row justify-between items-center w-full border-b border-[#d7d7d7] p-3 md:p-5 bg-white sticky top-0 z-10">
                <div className="flex flex-row items-center gap-3">
                  <div
                    className="flex md:hidden cursor-pointer"
                    onClick={() => setShowChats(false)}
                  >
                    <ArrowLeftIcon className="size-5" />
                  </div>
                  <div
                    className="w-full flex flex-row gap-3 cursor-pointer"
                    onClick={handleProfileRoute}
                  >
                    <img
                      src={getProfilePic(activeUser)}
                      alt="profilepic"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-medium">
                        {activeUser?.userName}
                      </h1>
                      <div className="flex flex-row items-center text-center gap-1">
                        <span
                          className={`w-[8px] h-[8px] rounded-full ${
                            isUserOnline(activeUser.userId)
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></span>
                        <h1 className="text-sm md:text-md text-gray-500">
                          {isUserOnline(activeUser.userId)
                            ? "online"
                            : "offline"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="hidden md:flex items-center"
                  onClick={handleProfileRoute}
                >
                  <button className="p-2 pl-4 pr-4 bg-white text-lime-900 font-medium border-1 border-lime-800 outline-none hover:bg-lime-800 hover:text-white rounded-lg text-sm active:scale-95 cursor-pointer">
                    View profile
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-3 md:p-5 overflow-hidden">
                <div className="message w-full flex flex-col mt-5 gap-5 overflow-y-auto flex-1 mb-5">
                  {messages.map((message, index) => (
                    <div className="w-full" key={message.messageId || index}>
                      {message.senderId === user?.userId ? (
                        <div className="flex justify-end flex-row gap-2 mr-2 md:mr-8">
                          <div className="p-2 bg-lime-800 rounded-lg max-w-3/5 flex flex-col">
                            <p className="w-full text-wrap text-white font-medium">
                              {message.textMessage}
                            </p>
                            <span className="text-xs text-lime-200 mt-1 self-end">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-row gap-2 max-w-3/4">
                          <img
                            src={getProfilePic(activeUser)}
                            alt="profilepic"
                            className="w-[35px] h-[35px] rounded-full"
                          />

                          <div className="p-2 bg-gray-100 rounded-lg  flex flex-col">
                            <p className="text-wrap font-medium">
                              {message.textMessage}
                            </p>
                            <span className="text-sm text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="w-full p-3 md:p-5 border-t border-[#d7d7d7] bg-white">
                <div className="min-w-full flex flex-row items-center justify-between gap-2 md:gap-5">
                  <input
                    onChange={(e) => setTextMessage(e.target.value)}
                    value={textMessage}
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleMessageSend();
                      }
                    }}
                    placeholder="Type a message..."
                    className="w-full p-3 border border-[#afafaf] rounded-xl outline-none focus:border-lime-700"
                    disabled={!isConnected}
                  />
                  <div
                    className={`p-2 md:p-3 rounded-xl flex items-center justify-center active:scale-90 cursor-pointer transition-colors ${
                      isConnected && textMessage.trim()
                        ? "bg-lime-800 hover:bg-lime-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleMessageSend}
                  >
                    <SendSharp color="#fff" height="25px" width="25px" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center h-full">
              <img
                className="w-[300px] h-[300px]"
                src={conversationImg}
                alt="Conversation"
              />

              {user?.role === "client" ? (
                <h2 className="text-center font-medium mt-5 text-md md:text-lg">
                  Start chatting with freelancers to discuss <br /> your ideas,
                  budget, and timeline.
                </h2>
              ) : (
                <h2 className="text-center text-md md:text-lg font-medium mt-5">
                  Start a conversation to understand the client's <br /> needs
                  and expectations.
                </h2>
              )}

              <p className="text-center text-gray-400 text-sm md:text-md mt-5">
                We value your privacy - Gigconnect
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserListItem = ({
  user,
  activeUser,
  getProfilePic,
  handleActiveUser,
  lastMessages,
  formatTime,
  isUserOnline,
}) => (
  <div
    onClick={() => handleActiveUser(user)}
    className={`flex flex-row items-start cursor-pointer w-full gap-3 border-t-1 border-t-[#d7d7d7] p-3 md:p-5 hover:bg-gray-50 transition-colors ${
      activeUser?.userName === user?.userName
        ? "border-lime-700 bg-[#ccf99823] border-l-5 rounded-sm"
        : ""
    }`}
  >
    <div className="flex min-w-[50px] min-h-[50px] flex-col relative">
      <img
        src={getProfilePic(user)}
        alt="profilepic"
        className="w-[50px] h-[50px] rounded-full"
      />
    </div>

    <div className="flex-1 flex flex-col min-w-0">
      <h1 className="font-medium text-gray-800">{user?.userName}</h1>
      <p className="text-sm text-gray-600 truncate">
        {lastMessages[user.userId]?.text || "Click to start conversation..."}
      </p>
      <div className="w-full flex flex-row items-center justify-between mt-1">
        <span className="text-xs text-gray-500">
          {user?.profile?.job || "freelancer"}
        </span>
        {lastMessages[user.userId] && (
          <span className="text-xs text-gray-400">
            {formatTime(lastMessages[user.userId].timestamp)}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default Messenger;
