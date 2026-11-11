import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "lenden-backend",
    brokers: ["localhost:9092"]
});


export const producer = kafka.producer();

export const createConsumer = (groupId: string) => {
    return kafka.consumer({ groupId });
};