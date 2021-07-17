import {
    generateObjectId
} from "../tools/objectIdGenerator";
import {
    customCopyObject
} from "../tools/customCopyObject";

export const Paragraph = (text = "") => {
    return customCopyObject({
        id: generateObjectId(),
        text: text,
        type: "text",
        citations: []
    });
}