import React, { useState } from "react";
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
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Meesenger = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [clientData, setclientData] = useState(user || null);
  const [SearchFreelancer, setSearchFreelancer] = useState("");
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [activeUser, setactiveUser] = useState([]);
  const [filterdList, setFilterdList] = useState([]);
  const [showChats, setShowChats] = useState(false);
  const navigate = useNavigate();

  const determineUserRole = (user) => {
    const userIs = user?.role;
    let targetRole = "";

    if (userIs === "client") {
      targetRole = "freelancer";
    } else if (userIs === "freelancer") {
      targetRole = "client";
    }

    setRole(targetRole);
    getUserList(targetRole);
  };

  const getUserList = async (targetRole) => {
    console.log(role);
    setLoading(true);
    try {
      const getList = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/profile/getuser`,
        { role: targetRole },
        { withCredentials: true }
      );
      setUsersList(getList?.data?.fetchUser);
    } catch (e) {
      console.log("error occured while fetching usersList", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setclientData(user);
      determineUserRole(user);
    }
  }, [user]);
  useEffect(() => {
    if (role) {
      getUserList();
    }
  }, [role]);

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_BACKEND_URI || "http://localhost:3000",
      {
        withCredentials: true,
      }
    );

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("hello");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const handleMessageSend = () => {
    if (textMessage.trim()) {
      const newMessage = {
        senderId: user.userId,
        textMessage: textMessage,
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      setTextMessage("");
    }
  };

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
    setactiveUser(users);
  };

  const handleprofileRoute = () => {
    navigate(`/profile?id=${activeUser?.userId}`);
  };

  const filterUsers = (text) => {
    const filteredUsers = usersList.filter((user) =>
      user.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilterdList(filteredUsers);
  };

  console.log(showChats);
  return (
    <div className="w-full ">
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
              className="w-full p-2  pl-12 font-medium border-2 border-[#d7d7d7]  outline-none rounded-xl"
              onChange={(e) => {
                setSearchFreelancer(e.target.value);
                filterUsers(SearchFreelancer);
              }}
              value={SearchFreelancer}
            />
          </div>

          <div className="flex flex-col w-full  mt-1.5 gap-3">
            {SearchFreelancer.length > 0 ? (
              filterdList.length > 0 ? (
                filterdList.map((users, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleActiveUser(users);
                    }}
                    className={`flex flex-row items-start cursor-pointer w-full gap-3 border-t-1 border-t-[#d7d7d7] p-3 md:p-5 ${
                      activeUser?.userName === users?.userName
                        ? "border-lime-700 bg-[#ccf99823] border-l-5 rounded-sm"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-[50px] min-h-[50px] flex-col relative">
                      <img
                        src={getProfilePic(users)}
                        alt="profilepic"
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <span className="w-[15px] h-[15px] bg-green-400 rounded-full absolute right-0 bottom-0"></span>
                    </div>

                    <div className="max-w-4/5 flex flex-col">
                      <h1 className="font-medium">{users?.userName}</h1>
                      <p className="max-w-full text-nowrap overflow-hidden text-ellipsis">
                        Hello how are u my friend i miss u a lot can we have a
                        dinner tonight?
                      </p>
                      <div className="w-full flex flex-row items-center justify-between">
                        <div>
                          <span className="text-sm mt-1 text-gray-500">
                            {users?.profile?.job || "freelancer"}
                          </span>
                        </div>
                        <div>
                          <p className="w-[25px] h-[25px] flex items-center justify-center bg-lime-700 text-white rounded-full text-xs font-medium">
                            5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <div
                  key={index}
                  onClick={() => handleActiveUser(users)}
                  className={`flex flex-row items-start cursor-pointer w-full gap-3 border-t-1 border-t-[#d7d7d7] p-3 md:p-5 ${
                    activeUser?.userName === users?.userName
                      ? "border-lime-700 bg-[#ccf99823] border-l-5 rounded-sm"
                      : ""
                  }`}
                >
                  <div className="flex min-w-[50px] min-h-[50px] flex-col relative">
                    <img
                      src={getProfilePic(users)}
                      alt="profilepic"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <span className="w-[15px] h-[15px] bg-green-400 rounded-full absolute right-0 bottom-0"></span>
                  </div>

                  <div className="max-w-4/5 flex flex-col">
                    <h1 className="font-medium">{users?.userName}</h1>
                    <p className="max-w-full text-nowrap overflow-hidden text-ellipsis">
                      Hello how are u my friend i miss u a lot can we have a
                      dinner tonight?
                    </p>
                    <div className="w-full flex flex-row items-center justify-between">
                      <div>
                        <span className="text-sm mt-1 text-gray-500">
                          {users?.profile?.job || "freelancer"}
                        </span>
                      </div>
                      <div>
                        <p className="w-[25px] h-[25px] flex items-center justify-center bg-lime-700 text-white rounded-full text-xs font-medium">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={`  ${showChats ? "flex" : "hidden md:flex"} w-full`}>
          {activeUser.length !== 0 ? (
            <div className="w-full flex flex-col h-full">
              <div className="flex flex-row justify-between items-center w-full border-b border-[#d7d7d7] p-3 md:p-5 bg-white sticky top-0 z-10">
                <div className="flex flex-row items-center gap-3">
                  <div
                    className="flex md:hidden"
                    onClick={() => setShowChats(false)}
                  >
                    <ArrowLeftIcon className="size-5" />
                  </div>
                  <div
                    className="w-full flex flex-row gap-3"
                    onClick={handleprofileRoute}
                  >
                    <img
                      src={getProfilePic(activeUser)}
                      alt="profilepic"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div className="flex  flex-col ">
                      <h1 className="text-lg font-medium">
                        {activeUser?.userName}
                      </h1>
                      <div className="flex flex-row items-center text-center gap-1">
                        <span className="w-[8px] h-[8px] bg-green-500 rounded-full"></span>
                        <h1 className="text-sm md:text-md text-gray-500">
                          online
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className=" hidden md:flex items-center"
                  onClick={handleprofileRoute}
                >
                  <button className="p-2 pl-4 pr-4 bg-white text-lime-900 font-medium border-1 border-lime-800 outline-none hover:bg-lime-800 hover:text-white rounded-lg text-sm active:scale-95 cursor-pointer">
                    View profile
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-3 md:p-5 overflow-hidden">
                <div className="w-full text-center sticky top-0 z-10">
                  <span className="p-1 pl-3 pr-3 text-sm bg-gray-200 text-gray-600 rounded-2xl">
                    Today
                  </span>
                </div>
                <div className="message w-full flex flex-col mt-5 gap-5 overflow-y-auto flex-1 mb-5">
                  {messages.map((message, index) => (
                    <div className="w-full" key={index}>
                      {message.senderId === user?.userId ? (
                        <div className="flex justify-end flex-row gap-2 mr-2 md:mr-8">
                          <div className="p-2 bg-lime-800  rounded-lg max-w-3/5 flex flex-col">
                            <p className="w-full text-wrap text-white font-medium">
                              {message.textMessage}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row gap-2">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URI}/profilePics/${user?.profile?.profilePic}`}
                            alt="profilepic"
                            className="w-[35px] h-[35px] rounded-full "
                          />
                          <div className="w-full flex flex-col gap-1">
                            <div className="p-2 bg-gray-100 rounded-lg max-w-3/5 flex flex-col">
                              <p className="text-wrap font-medium">
                                Hi! I've reviewed your project requirements and
                                I'm excited to work with you on this UI/UX
                                design project.
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">
                              10:00 AM
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
                  />
                  <div
                    className="p-2 md:p-3 bg-lime-800 rounded-xl flex  items-center justify-center active:scale-90 cursor-pointer"
                    onClick={() => handleMessageSend()}
                  >
                    <SendSharp color={"#fff"} height="25px" width="25px" />
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
                <h2 className="text-center  font-medium mt-5 text-md md:text-lg">
                  Start chatting with freelancers to discuss <br /> your ideas,
                  budget, and timeline.
                </h2>
              ) : (
                <h2 className="text-center  text-md md:text-lg font-medium mt-5">
                  Start a conversation to understand the client's <br /> needs
                  and expectations.
                </h2>
              )}

              <p className="text-center text-gray-400  text-sm md:text-md mt-5">
                We value your privacy -Gigconnect
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meesenger;
