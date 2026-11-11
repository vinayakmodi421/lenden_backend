import { producer } from "../kafka.js";

export const publishMsgCreated = async (msg: any) => {
    await producer.send({
        topic: "message",
        messages: [
            {
                key: String(msg.messageId),
                value: JSON.stringify({
                    event: "MSG_SENT",
                    ...{msg}
                })
            }
        ]
    });
};
export const publishMsgDelivered = async (msg: any) => {
    // console.log(msg)
    await producer.send({
        topic: "message",
        messages: [
            {
                key: String(msg.messageId),
                value: JSON.stringify({
                    event: "MSG_DELIVERED",
                    ...{msg}
                })
            }
        ]
    });
};
export const publishMsgSeen = async (msg: any) => {
    await producer.send({
        topic: "message",
        messages: [
            {
                key: String(msg.userId),
                value: JSON.stringify({
                    event: "MSG_SEEN",
                    ...{msg}
                })
            }
        ]
    });
};