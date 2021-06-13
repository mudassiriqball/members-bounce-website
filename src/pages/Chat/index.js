import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import moment from "moment"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import images from "../../assets/images"
import { firebase } from 'helpers';
import { authenticateUser } from "store/actions";
import { GiftedChat } from 'react-gifted-chat';

const Chat = props => {
  const { history, user, authenticateUser } = props;
  const [chatUser, setChatUser] = useState({ _id: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [sendLoading, setSendLoading] = useState(false);
  const [sender, setSender] = useState({ _id: '', firstName: '', fcmToken: '' });
  const [receiver, setReceiver] = useState({ _id: '', firstName: '', fcmToken: '' });
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState(null)
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  // eslint-disable-next-line no-unused-vars
  const [curMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    if (user) {
      setChatUser(user);
    }
    return () => {}
  }, [user]);
  useEffect(() => {
    if (chatUser._id !== '') {
      try {
        setIsLoading(true);
        firebase
          .database()
          .ref('users')
          .on('value', (dataSnapshot) => {
            let arr = [];
            dataSnapshot && dataSnapshot.forEach((child) => {
              let sender = child.val().sender;
              let receiver = child.val().receiver;

              if (sender._id === chatUser._id) {
                let count = 0;
                firebase
                  .database()
                  .ref('chats')
                  .child(sender._id > receiver._id ? sender._id : receiver._id)
                  .child(sender._id > receiver._id ? receiver._id : sender._id)
                  .on('value', (dataSnapshot) => {
                    dataSnapshot && dataSnapshot.forEach((child) => {
                      if (child.val().received === false && child.val().user._id !== sender._id) {
                        count++;
                      }
                    });
                  })
                arr.push({ user: receiver, isNew: count });
              } else if (receiver._id === chatUser._id) {
                let count = 0;
                firebase
                  .database()
                  .ref('chats')
                  .child(sender._id > receiver._id ? sender._id : receiver._id)
                  .child(sender._id > receiver._id ? receiver._id : sender._id)
                  .on('value', (dataSnapshot) => {
                    dataSnapshot && dataSnapshot.forEach((child) => {
                      if (child.val().received === false && child.val().user._id !== receiver._id) {
                        count++;
                      }
                    });
                  })
                arr.push({ user: sender, isNew: count });
              }
            });
            setUsers(arr.reverse());
            setIsLoading(false);
          })
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log('Loading chat error:', err);
      }
    }
    return () => {}
  }, [chatUser]);
  // 
  useEffect(() => {
    if (sender._id !== '' && receiver._id !== '') {
      setIsLoadingChat(true);
      try {
        firebase
          .database()
          .ref('chats')
          .child(sender._id > receiver._id ? sender._id : receiver._id)
          .child(sender._id > receiver._id ? receiver._id : sender._id)
          .on('value', (dataSnapshot) => {
            let msgs = [];
            dataSnapshot && dataSnapshot.forEach((child) => {
              msgs.push({ ...child.val(), createdAt: JSON.parse(child.val().createdAt), key: child.key });
              try {
                if (sender._id === child.val().receiver._id) {
                  setMerkAsRead(child.key);
                }
              } catch (error) {
              }
            });
            setMessages(msgs.reverse());
            setIsLoadingChat(false);
          });
        setIsLoadingChat(false);
      } catch (err) {
        setIsLoadingChat(false);
        console.log('Loading chat error:', err);
      }
    }
    return () => {
    }
  }, [sender, receiver]);

  useEffect(() => {
    if (messages.length > 0) setIsLoadingChat(false);
    if (!isEmpty(messages)) scrollToBottom()
    return () => {}
  }, [messages]);

  async function setMerkAsRead(msg) {
    let msgsRef = firebase
      .database()
      .ref('chats')
      .child(sender._id > receiver._id ? sender._id : receiver._id)
      .child(sender._id > receiver._id ? receiver._id : sender._id)
      .child(msg)
    msgsRef.update({ received: true });
  }

  async function handleSend(msg) {
    setSendLoading(true);
    try {
      await firebase
        .database()
        .ref('chats')
        .child(sender._id > receiver._id ? sender._id : receiver._id)
        .child(sender._id > receiver._id ? receiver._id : sender._id)
        .push({
          _id: msg[0]._id,
          createdAt: JSON.stringify(msg[0].createdAt),
          text: msg[0].text,
          sent: true,
          received: false,
          receiver: {
            _id: receiver._id,
            firstName: receiver.firstName,
            lastName: receiver.lastName,
          },
          user: {
            _id: sender._id,
            firstName: sender.firstName,
            lastName: sender.lastName,
          }
        })
      setSendLoading(false);
      if (messages.length < 1) {
        firebase
          .database()
          .ref('users')
          .push({
            sender: {
              _id: sender._id,
              firstName: sender.firstName,
              lastName: sender.lastName,
            },
            receiver: {
              _id: receiver._id,
              firstName: receiver.firstName,
              lastName: receiver.lastName,
            }
          });
      }
      sendPushNotification(
        token,
        receiver._id,
        `New message from ${sender.firstName + ' ' + sender.lastName}`,
        msg[0].text,
        sender
      )
    } catch (err) {
      setSendLoading(false);
      console.log('snd msg err:', err);
    }
  }

  useEffect(() => {
    if (!user) {
      authenticateUser();
    }
  }, []);

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu)
  }

  const toggleOther = () => {
    setother_Menu(!other_Menu)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  //Use For Chat Box
  const userChatOpen = (sender, receiver) => {
    setSender(sender);
    setReceiver(receiver);
  }

  const addMessage = (roomId, sender) => {
    const { onAddMessage } = props
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date(),
    }
    setCurrentMessage("")
    onAddMessage(message)
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      setCurrentMessage(value)
      handleSend();
    }
  }

  console.log(users)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Chat | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Members Bounce" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div className="">
                    <div className="py-4 border-bottom">
                      <Media>
                        <div className="align-self-center me-3">
                          <img
                            src={images.avatar1}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <Media body>
                          <h5 className="font-size-15 mt-0 mb-1">
                            {chatUser.firstName + ' ' + chatUser.lastName}
                          </h5>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-1" />
                            Active
                          </p>
                        </Media>
                        <Dropdown
                          isOpen={menu1}
                          toggle={() => setMenu1(!menu1)}
                          className="float-end ms-2"
                        >
                          <DropdownToggle tag="i" className="text-muted">
                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href="#">Action</DropdownItem>
                            <DropdownItem href="#">Another action</DropdownItem>
                            <DropdownItem href="#">Something else</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>

                      </Media>
                    </div>

                    <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1")
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Chats</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">Recent</h5>
                            <ul className="list-unstyled chat-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(users, item => (
                                  <li key={item.user._id}                                  >
                                    <Link to="#"
                                      onClick={() => {
                                        userChatOpen(chatUser, item.user)
                                      }}
                                    >
                                      <Media>
                                        <div className="align-self-center me-3">
                                          <img
                                            src={item.user.avatar || images.avatar1}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                          />
                                        </div>

                                        <Media className="overflow-hidden" body>
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {item.user.firstName + ' ' + item.user.lastName}
                                          </h5>
                                        </Media>
                                      </Media>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {sender && sender && (receiver.firstName + ' ' + receiver.lastName)}
                          </h5>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                  right
                                >
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                        {/* <InputGroupAddon addonType="append"> */}
                                        <Button color="primary" type="submit">
                                          <i className="mdi mdi-magnify" />
                                        </Button>
                                        {/* </InputGroupAddon> */}
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item  d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-cog" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem href="#">
                                    View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Clear chat
                                  </DropdownItem>
                                  <DropdownItem href="#">Muted</DropdownItem>
                                  <DropdownItem href="#">Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem href="#">Action</DropdownItem>
                                  <DropdownItem href="#">
                                    Another Action
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Something else
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "470px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>
                            {messages &&
                              map(messages, message => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.sender === sender.firstName
                                      ? "right"
                                      : ""
                                  }
                                >
                                  <div className="conversation-list">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        className="btn nav-btn"
                                        tag="i"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu direction="right">
                                        <DropdownItem href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem onClick={() => {}}>
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender}
                                      </div>
                                      <p>{message.message}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle me-1" />
                                        {moment(message.createdAt).format(
                                          "DD-MM-YY hh:mm"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            {/* <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={e => setCurrentMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div> */}
                            {isLoading ?
                              <Loading />
                              :
                              <GiftedChat
                                messages={messages}
                                user={{
                                  _id: sender._id,
                                  name: sender.firstName + ' ' + sender.lastName,
                                }}
                                maxInputLength={1000}
                                // renderAvatar={() => renderAvatar(receiver, colors)}
                                // renderSend={(props) => renderSend(props, sendLoading, colors)}
                                // renderLoading={() => renderLoading(colors)}
                                onSend={handleSend}
                                isLoadingEarlier={true}
                              />
                            }
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={() => handleSend()}
                              className="btn btn-primary btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
  authenticateUser
};


export default connect(mapStateToProps, mapDispatchToProps)(Chat)
